import { Client } from "@modelcontextprotocol/client";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/client";
import "dotenv/config";

async function runJinaClient() {
  // API key propia. Nunca debe escribirse en el código ni subirse a GitHub.
  const apiKey = process.env.jinaApiKey;
  if (!apiKey) {
    throw new Error("Falta jinaApiKey. Crea jina/.env a partir de .env.example");
  }

  const client = new Client({
    name: "mi-cliente-jina",
    version: "1.0.0",
  });

  // Jina ya tiene un servidor remoto: solo tenemos que conectarnos por HTTP.
  const jinaEndpoint = "https://mcp.jina.ai/v1";
  const transport = new StreamableHTTPClientTransport(new URL(jinaEndpoint), {
    // Se añade la cabecera Authorization a cada petición de forma compatible con el ejemplo original.
    fetch: (input, init) => {
      const customHeaders = new Headers(init?.headers);
      customHeaders.set("Authorization", `Bearer ${apiKey}`);
      return fetch(input, { ...init, headers: customHeaders });
    },
  });

  try {
    await client.connect(transport);
    console.log("¡Conectado al Remote MCP Server de Jina AI!");

    const { tools } = await client.listTools();
    console.log("Herramientas de Jina disponibles:", tools.map((t) => t.name));

    // Mismo ejemplo que el profesor: usar la herramienta remota read_url.
    const result = await client.callTool({
      name: "read_url",
      arguments: { url: "https://creanovatech.com/" },
    });
    if (result.isError) {
      console.error("Jina devolvió un error:", result.content);
      return;
    }
    result.content.forEach((block) => {
      if (block.type === "text") console.log(`El resultado devuelto es: ${block.text}`);
    });
  } finally {
    await client.close();
  }
}

runJinaClient().catch((error) => {
  console.error("Error conectando a Jina:", error);
  process.exitCode = 1;
});
