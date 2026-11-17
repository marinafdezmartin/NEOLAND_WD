import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";
import "dotenv/config";

// Detenemos el programa si falta la clave, antes de intentar comunicarnos con Groq.
if (!process.env.GROQ_API_KEY?.trim()) {
  console.error(
    "Falta GROQ_API_KEY. Configúrala en el archivo .env de 13_LangGraph y ejecuta este ejemplo desde esa carpeta."
  );
  process.exit(1);
}

// ChatGroq conecta LangChain con este modelo; temperature: 0 reduce la variación.
// maxRetries permite reintentar ciertos fallos y la clave se toma del entorno.
const llm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxRetries: 2,
  apiKey: process.env.GROQ_API_KEY,
});

// invoke envía los mensajes y espera un AIMessage: system da la instrucción de traducir
// y HumanMessage contiene la frase del usuario; el texto de la respuesta está en content.
const aiMsg = await llm.invoke([
  {
    role: "system",
    content:
      "You are a helpful assistant that translates English to Spanish. Translate the user sentence.",
  },
  new HumanMessage("I love programming."),
]);

console.log("Tipo de respuesta:", aiMsg.constructor.name);
console.log("Traducción:", aiMsg.content);
