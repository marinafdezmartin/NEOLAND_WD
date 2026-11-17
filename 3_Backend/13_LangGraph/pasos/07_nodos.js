import assert from "node:assert/strict";
import { ChatGroq } from "@langchain/groq";
import { ToolMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { END, StateSchema, MessagesValue } from "@langchain/langgraph";
import { z } from "zod";
import "dotenv/config";

// tool() describe la calculadora para la IA; la función la ejecuta Node.
// Zod exige dos números y devolvemos la suma como texto para usarla en un mensaje.
const sumar = tool(
  ({ a, b }) => {
    console.log(`[⚙️ Calculando ${a} + ${b}...]`);
    return String(a + b);
  },
  {
    name: "sumar",
    description: "Suma dos números",
    schema: z.object({ a: z.number(), b: z.number() }),
  }
);

// StateSchema define messages; MessagesValue combina los mensajes de cada paso.
// Los nuevos se acumulan y los que repiten identificador actualizan el anterior.
const MiEstado = new StateSchema({ messages: MessagesValue });

// Enviamos toda la conversación a la IA para que tenga contexto.
// El nodo devuelve solo la respuesta nueva; MessagesValue la integra en el estado.
async function nodoIA(estado) {
  // Configuramos la IA aquí para que las pruebas locales no necesiten clave.
  if (!process.env.GROQ_API_KEY?.trim()) {
    throw new Error("Falta GROQ_API_KEY en el archivo .env de 13_LangGraph.");
  }

  // bindTools() comunica a Groq cómo pedir sumar mediante tool_calls.
  // La petición no ejecuta la herramienta: esa tarea le corresponde a nuestro programa.
  const ia = new ChatGroq({
    model: "openai/gpt-oss-20b",
    temperature: 0,
  }).bindTools([sumar]);

  const respuesta = await ia.invoke(estado.messages);
  return { messages: [respuesta] };
}

// Leemos las tool_calls del último mensaje y ejecutamos las peticiones a sumar.
// Pasar la petición completa conserva su id en el ToolMessage que vuelve a la IA.
async function nodoHerramientas(estado) {
  const ultimoMensaje = estado.messages[estado.messages.length - 1];
  const resultados = [];

  for (const peticion of ultimoMensaje.tool_calls || []) {
    if (peticion.name === "sumar") {
      resultados.push(await sumar.invoke(peticion));
    }
  }

  return { messages: resultados };
}

// Si la IA pide una herramienta, seguimos por herramientas; si no, terminamos con END.
// Solo consultamos datos del estado, por eso esta función no necesita async.
function decidirCamino(estado) {
  const ultimoMensaje = estado.messages[estado.messages.length - 1];
  if (ultimoMensaje.tool_calls && ultimoMensaje.tool_calls.length > 0) {
    return "herramientas";
  }
  return END;
}

// Pruebas locales: simulamos las respuestas de la IA sin llamar a nodoIA.
const estadoConHerramienta = {
  messages: [
    {
      content: "",
      tool_calls: [
        {
          name: "sumar",
          args: { a: 2, b: 3 },
          id: "prueba_1",
          type: "tool_call",
        },
      ],
    },
  ],
};

// assert detiene la prueba si el camino elegido no coincide con el esperado.
const caminoConHerramienta = decidirCamino(estadoConHerramienta);
assert.equal(caminoConHerramienta, "herramientas");
console.log("1) Con petición de herramienta →", caminoConHerramienta);

// Ejecutamos solo la calculadora local y comprobamos el tipo, el contenido y el id de su respuesta.
const salidaHerramientas = await nodoHerramientas(estadoConHerramienta);
assert.equal(salidaHerramientas.messages.length, 1);
const resultado = salidaHerramientas.messages[0];
assert.ok(resultado instanceof ToolMessage);
assert.equal(resultado.content, "5");
assert.equal(resultado.tool_call_id, "prueba_1");
console.log(
  "2)",
  resultado.constructor.name,
  "→",
  resultado.content,
  "| id:",
  resultado.tool_call_id
);

// Simulamos una respuesta normal sin tool_calls para comprobar que el recorrido termina.
const estadoSinHerramienta = {
  messages: [{ content: "Azul." }],
};

const caminoSinHerramienta = decidirCamino(estadoSinHerramienta);
assert.equal(caminoSinHerramienta, END);
console.log("3) Sin petición de herramienta →", caminoSinHerramienta);
console.log("Pruebas locales superadas.");
