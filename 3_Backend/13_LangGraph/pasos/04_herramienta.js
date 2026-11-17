import { tool } from "@langchain/core/tools";
import { z } from "zod";

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

// Prueba A: invocación directa con los datos.
// Con los argumentos sueltos, invoke devuelve directamente el texto de la suma.
console.log(await sumar.invoke({ a: 2, b: 3 }));

// Prueba B: invocación con una petición de herramienta.
// Al recibir una tool_call con id, LangChain devuelve un ToolMessage asociado a esa petición.
const resultado = await sumar.invoke({
  name: "sumar",
  args: { a: 2, b: 3 },
  id: "prueba_1",
  type: "tool_call",
});

console.log(
  resultado.constructor.name,
  "→",
  resultado.content,
  "| id:",
  resultado.tool_call_id
);
