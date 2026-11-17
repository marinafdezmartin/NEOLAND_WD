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
import { WebSocketServer, WebSocket } from "ws";
import { randomUUID } from "node:crypto";
import "dotenv/config";

// Detenemos el programa si falta la clave, antes de intentar comunicarnos con Groq.
if (!process.env.GROQ_API_KEY?.trim()) {
  console.error(
    "Falta GROQ_API_KEY. Configúrala en el archivo .env de 13_LangGraph antes de iniciar el servidor."
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

// Este servidor acepta conexiones del navegador y mantiene abierto el canal de mensajes.
const wss = new WebSocketServer({ port: 8080 });

wss.on("listening", () => {
  console.log("Servidor LangGraph escuchando en ws://localhost:8080");
});

wss.on("error", () => {
  console.error(
    "No se pudo mantener el servidor WebSocket. Comprueba que el puerto 8080 está disponible."
  );
});

// Cada conexión recibe su propio socket: por él llegan las preguntas y salen las respuestas.
wss.on("connection", (socket) => {
  console.log("Cliente conectado.");

  // Un thread_id distinto por conexión separa los historiales dentro de la memoria compartida.
  const config = {
    configurable: { thread_id: randomUUID() },
  };

  // Procesamos los turnos de esta conexión en orden para conservar su historial.
  // Cada tarea se encadena a la anterior con then; dos mensajes rápidos no pisan el mismo estado.
  let cola = Promise.resolve();

  // ws entrega los datos recibidos; los convertimos a texto y descartamos las líneas vacías.
  socket.on("message", (mensaje) => {
    const textoUsuario = mensaje.toString().trim();
    if (!textoUsuario) return;

    // El turno espera su sitio en la cola y no comienza si el cliente ya se desconectó.
    cola = cola.then(async () => {
      if (socket.readyState !== WebSocket.OPEN) return;

      try {
        // Entra solo el mensaje nuevo. El grafo recupera el historial, consulta a la IA
        // y, si hay tool_calls, ejecuta sumar y vuelve a la IA antes de terminar.
        const resultado = await grafo.invoke(
          { messages: [new HumanMessage(textoUsuario)] },
          config
        );
        const ultimoMensaje = resultado.messages[resultado.messages.length - 1];

        // El último mensaje es la respuesta final; la enviamos si la conexión sigue abierta.
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(ultimoMensaje.content);
        }
      // Comunicamos un fallo sin enviar detalles internos ni credenciales al navegador.
      } catch {
        console.error("No se pudo procesar un mensaje del cliente.");
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(
            "No se pudo obtener la respuesta. Vuelve a intentarlo en unos instantes."
          );
        }
      }
    });
  });

  socket.on("error", () => {
    console.error("Se ha producido un error en la conexión WebSocket del cliente.");
  });

  socket.on("close", () => {
    console.log("Cliente desconectado.");
  });
});
