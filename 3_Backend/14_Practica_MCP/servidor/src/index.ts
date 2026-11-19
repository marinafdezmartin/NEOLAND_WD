import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";

// Se crea un servidor nuevo cada vez que el transporte lo solicita.
function createServer() {
  const server = new McpServer({
    name: "calculadora",
    version: "1.0.0",
  });

  // Herramienta MCP que recibe dos números y devuelve la suma.
  server.registerTool(
    "suma",
    {
      description: "suma 2 numeros",
      inputSchema: z.object({
        a: z.number().describe("introduce un numero"),
        b: z.number().describe("introduce el 2do numero"),
      }),
    },
    async ({ a, b }) => {
      return {
        content: [
          {
            type: "text",
            text: `${a + b}`,
          },
        ],
      };
    },
  );

  return server;
}

// MCP por stdio: la terminal es el canal de comunicación con el cliente.
serveStdio(createServer, {
  onerror: (error) => console.error("Calculadora MCP Server error:", error),
});
console.error("Calculadora MCP Server running on stdio");
