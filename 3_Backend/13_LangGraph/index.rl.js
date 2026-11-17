import {
  StateGraph,
  START,
  END,
  StateSchema,
  MessagesValue,
  MemorySaver,
} from "@langchain/langgraph";
import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import readline from "node:readline";
import "dotenv/config";

// Detenemos el programa si falta la clave, antes de intentar comunicarnos con Groq.
if (!process.env.GROQ_API_KEY?.trim()) {
  console.error(
    "Falta GROQ_API_KEY. Configúrala en el archivo .env de 13_LangGraph antes de iniciar el chat."
  );
  process.exit(1);
}

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

// bindTools() comunica a Groq cómo pedir sumar mediante tool_calls.
// La petición no ejecuta la herramienta: esa tarea le corresponde a nuestro programa.
const ia = new ChatGroq({
  model: "openai/gpt-oss-20b",
  temperature: 0,
}).bindTools([sumar]);

// Enviamos toda la conversación a la IA para que tenga contexto.
// El nodo devuelve solo la respuesta nueva; MessagesValue la integra en el estado.
async function nodoIA(estado) {
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

// Guardamos el estado de cada conversación en la RAM del proceso de Node.
// Esta memoria se pierde cuando se cierra el programa.
const memoria = new MemorySaver();

// El recorrido empieza en ia y decidirCamino elige herramientas o END.
// Tras calcular volvemos a ia para que lea el resultado y redacte la respuesta.
const grafo = new StateGraph(MiEstado)
  .addNode("ia", nodoIA)
  .addNode("herramientas", nodoHerramientas)
  .addEdge(START, "ia")
  .addConditionalEdges("ia", decidirCamino, ["herramientas", END])
  .addEdge("herramientas", "ia")
  // compile prepara el grafo para ejecutarlo y conecta la memoria como checkpointer.
  .compile({ checkpointer: memoria });

// readline conecta la entrada y la salida de la terminal para preguntar y mostrar respuestas.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Todos los turnos usan el mismo thread_id para recuperar el historial de este chat.
const config = {
  configurable: { thread_id: "chat_terminal" },
};

// Recordamos si readline se cerró para no volver a preguntar al terminar una respuesta pendiente.
let chatCerrado = false;
rl.on("close", () => {
  chatCerrado = true;
});

console.log('Chat iniciado. Escribe "salir" para terminar.');

// question espera una línea; después de atenderla volvemos a llamar a esta función.
function iniciarChat() {
  if (chatCerrado) return;

  rl.question("Tú: ", async (texto) => {
    const mensaje = texto.trim();

    // Salir cierra readline; una línea vacía vuelve a preguntar sin consumir una llamada a Groq.
    if (mensaje.toLowerCase() === "salir") {
      console.log("¡Adiós!");
      return rl.close();
    }

    if (!mensaje) {
      return iniciarChat();
    }

    try {
      // Enviamos solo el mensaje nuevo: el checkpointer recupera los anteriores con config.
      const resultado = await grafo.invoke(
        { messages: [new HumanMessage(mensaje)] },
        config
      );
      const ultimoMensaje = resultado.messages[resultado.messages.length - 1];
      console.log(`IA: ${ultimoMensaje.content}\n`);
    // Avisamos del fallo sin imprimir credenciales y después permitimos escribir otro mensaje.
    } catch {
      console.error(
        "No se pudo obtener la respuesta. Comprueba tu conexión y la configuración de Groq, y vuelve a intentarlo."
      );
    }

    iniciarChat();
  });
}

iniciarChat();
