import { ChatGroq } from "@langchain/groq";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import "dotenv/config";

// Detenemos el programa si falta la clave, antes de intentar comunicarnos con Groq.
if (!process.env.GROQ_API_KEY?.trim()) {
  console.error(
    "Falta GROQ_API_KEY. Configúrala en el archivo .env de 13_LangGraph y ejecuta este ejemplo desde esa carpeta."
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

// bindTools() comunica a Groq cómo pedir sumar mediante tool_calls.
// La petición no ejecuta la herramienta: esa tarea le corresponde a nuestro programa.
const ia = new ChatGroq({
  model: "openai/gpt-oss-20b",
  temperature: 0,
}).bindTools([sumar]);

// Observamos si la respuesta pide sumar en tool_calls; este ejemplo no ejecuta esa petición.
const r1 = await ia.invoke("¿Cuánto es 2 + 3?");
console.log({ content: r1.content, tool_calls: r1.tool_calls });

// Una pregunta sin cálculo permite comparar una respuesta de texto con una petición de herramienta.
const r2 = await ia.invoke("Dime un color");
console.log({ content: r2.content, tool_calls: r2.tool_calls });
