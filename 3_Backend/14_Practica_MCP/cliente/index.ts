import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import path from "node:path";

async function runClient() {
  // 1. Inicializar el cliente MCP con nombre y versión.
  const client = new Client({
    name: "mi-cliente-calculadora",
    version: "1.0.0",
  });

  // 2. El servidor está en una carpeta hermana: ../servidor/build/index.js.
  // Ejecuta este cliente desde la carpeta cliente (npm run start).
  const rutaServidor = path.resolve(process.cwd(), "../servidor/build/index.js");
  const transport = new StdioClientTransport({
    command: "node",
    args: [rutaServidor],
  });

  try {
    // 3. La conexión ARRANCA el servidor automáticamente; no abras otra terminal.
    await client.connect(transport);
    console.log("¡Conexión establecida con el servidor MCP!");

    // 4. Obtener la lista de herramientas del servidor.
    const { tools } = await client.listTools();
    console.log("Herramientas descubiertas:");
    tools.forEach((tool) => console.log(`- ${tool.name}: ${tool.description}`));

    // 5. Llamar a 'suma' usando el mismo ejemplo del profesor: 5 + 7.
    console.log("\nLlamando a la herramienta 'suma' con los números 5 y 7...");
    const result = await client.callTool({
      name: "suma",
      arguments: { a: 5, b: 7 },
    });

    // 6. Mostrar la respuesta recibida del servidor.
    result.content.forEach((block) => {
      if (block.type === "text") {
        console.log(`El resultado devuelto es: ${block.text}`);
      }
    });
  } finally {
    // 7. Cierra la conexión y el proceso hijo del servidor.
    await client.close();
  }
}

runClient().catch((error) => {
  console.error("Error ejecutando cliente MCP:", error);
  process.exitCode = 1;
});
