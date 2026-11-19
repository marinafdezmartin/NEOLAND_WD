# Guía de estudio: cómo funciona la práctica MCP

## 1. Qué es MCP

MCP (Model Context Protocol) es un protocolo que permite a un cliente descubrir y utilizar herramientas que proporciona un servidor.

- **Servidor MCP**: publica las herramientas (como `suma`).
- **Cliente MCP**: descubre las herramientas (`listTools`) y ejecuta una (`callTool`).
- **Transporte**: el canal por el que intercambian mensajes.
- **SDK**: librería que implementa MCP y evita que tengamos que escribir los mensajes JSON-RPC a mano.

En esta práctica NO hay una interfaz de React ni una página web. Son pequeños programas TypeScript ejecutados con Node.js.

## 2. Ejercicio 1: servidor calculadora

En `servidor/src/index.ts`:

1. Se importa `McpServer`, `serveStdio` y `zod`.
2. `createServer()` crea un servidor llamado `calculadora`.
3. `registerTool("suma", ...)` publica la herramienta.
4. `inputSchema` usa Zod para exigir dos números `a` y `b`.
5. El callback `async ({ a, b })` devuelve el resultado como `content: [{ type: "text", text: ... }]`.
6. `serveStdio` permite comunicarse por entrada/salida estándar.

**Importante:** el servidor MCP usa la salida estándar (`stdout`) para sus mensajes de protocolo. Por eso los logs normales del servidor se escriben con `console.error` (salida de errores, `stderr`); usar `console.log` para depuración puede romper la comunicación.

## 3. Ejercicio 2: cliente local

En `cliente/index.ts`:

1. `new Client(...)` crea el cliente.
2. `StdioClientTransport` prepara un proceso hijo: `node ../servidor/build/index.js`.
3. `client.connect(transport)` arranca ese proceso y negocia la conexión MCP.
4. `client.listTools()` devuelve las herramientas disponibles (aquí, `suma`).
5. `client.callTool({ name: "suma", arguments: { a: 5, b: 7 } })` pide sumar 5 + 7.
6. Se recorre `result.content` y se imprime `12`.
7. `client.close()` cierra la conexión y finaliza el servidor hijo.

**La pregunta de las dos terminales:** no hacen falta dos terminales en esta versión. Aunque el profesor creara dos repositorios para separar el código, es el transporte `stdio` quien levanta el servidor desde el cliente. Los repositorios y las terminales resuelven problemas distintos.

### Qué mensajes MCP ocurren por debajo

```text
Cliente                   Servidor
   | --- initialize ---->    |
   | <--- respuesta -----    |
   | --- tools/list ---->    |
   | <--- "suma" --------    |
   | --- tools/call ---->    |  { a:5, b:7 }
   | <--- "12" ---------    |
```

## 4. Ejercicio 3: Jina (cliente remoto)

En `jina/index.ts` se vuelve a crear un cliente MCP, pero se cambia el transporte:

- `StreamableHTTPClientTransport` conecta con `https://mcp.jina.ai/v1`.
- **Jina es el servidor MCP remoto**: no lo programas ni lo arrancas.
- `dotenv/config` carga `jina/.env` en `process.env`.
- La API key se envía en `Authorization: Bearer ...` para autenticar tus llamadas.
- `listTools()` consulta qué herramientas ofrece el servidor Jina en ese momento.
- `callTool({ name: "read_url", arguments: { url: ... } })` solicita leer una página web.
- `client.close()` libera recursos y cierra la conexión.

Jina **no es el modelo de IA de la práctica**: en este ejercicio se usa sobre todo como un servicio externo que **ofrece herramientas a través de MCP**. El cliente no envía preguntas a un modelo LLM; llama a una herramienta concreta.

## 5. Comparación rápida

| Aspecto | Calculadora local | Jina remoto |
|---|---|---|
| Servidor | Lo programas tú | Ya existe, lo gestiona Jina |
| Cliente | `cliente/index.ts` | `jina/index.ts` |
| Transporte | `StdioClientTransport` | `StreamableHTTPClientTransport` |
| Conexión | Arranca Node como proceso hijo | Conecta a una URL HTTPS |
| Necesita internet | Solo para instalar dependencias | Sí, en ejecución |
| API key | No | Sí, de Jina |
| Herramienta de ejemplo | `suma` | `read_url` |

## 6. Dudas frecuentes

**¿Por qué tres carpetas si son dos repositorios?** Para estudiar por separado: servidor propio, cliente de ese servidor y cliente conectado a un servicio externo. Al profesor le bastaban dos repositorios porque la variante Jina estaba en `index.jina.ts` junto al cliente.

**¿Dónde se configura el puerto?** No hay puerto en el ejemplo local: los datos pasan por la entrada y salida estándar del proceso. Jina usa HTTPS.

**¿Para qué sirve TypeScript aquí?** Para tipar el código. `tsc` genera `build/index.js`, que Node sí ejecuta.

**¿Por qué instalar tres veces las dependencias?** Cada carpeta es un proyecto Node independiente con su propio `package.json`. No son tres repositorios Git: todas están en el mismo repositorio del Bootcamp.

**¿Tengo que usar Claude o ChatGPT para que funcione?** No. El ejemplo llama herramientas directamente desde el cliente, sin modelo de lenguaje. Integrar una IA que elija herramientas sería otra práctica.

**¿Qué hago si Jina da error?** Comprueba `jina/.env`, que el nombre sea `jinaApiKey`, el estado de la API key, sus límites y tu conexión. Los nombres de herramientas pueden cambiar: `listTools()` los muestra.

## 7. Resumen rápido

- MCP = cliente, servidor, herramientas y transporte.
- El servidor publica herramientas con `registerTool`.
- El cliente descubre herramientas con `listTools` y las usa con `callTool`.
- Stdio = proceso local, normalmente arrancado por el cliente.
- HTTP = servidor remoto, se conecta por URL.
- Jina requiere clave propia y no debes subir `.env` a GitHub.
- El ejemplo local devuelve **5 + 7 = 12**.

## 8. Referencias para profundizar

- Guía original del profesor: https://github.com/fernandomartinez-neoland/-mcp/blob/main/GUIA.md
- Guía cliente local: https://github.com/fernandomartinez-neoland/mcp_clientOctubre2026/blob/main/GUIA_MCP_CLIENT.md
- Guía cliente Jina: https://github.com/fernandomartinez-neoland/mcp_clientOctubre2026/blob/main/GUIA_MCP_CLIENT_JINA.md
- Tutorial servidor MCP TypeScript: https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server#typescript
