# 14_Practica_MCP — Bootcamp

Práctica de **MCP (Model Context Protocol)** en TypeScript, adaptada de dos repositorios de clase de Fernando Martínez (Neoland) para guardarla dentro de **un único repositorio Bootcamp**.

## Estructura

```text
14_Practica_MCP/
├── servidor/           Servidor local MCP «calculadora» (stdio)
│   ├── src/index.ts
│   ├── package.json
│   └── tsconfig.json
├── cliente/            Cliente local MCP (stdio)
│   ├── index.ts
│   ├── package.json
│   └── tsconfig.json
├── jina/               Cliente remoto para Jina AI (HTTP)
│   ├── index.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── GUIA_ESTUDIO.md     Teoría sencilla y explicación archivo por archivo
└── .gitignore          Evita subir dependencias, compilados y secretos
```

## Requisitos

- Node.js y npm instalados (el profesor usa Node 24).
- VS Code.
- Internet para `npm install`, y además para el ejemplo de Jina.
- Una API key personal de Jina para ejecutar la tercera parte.

## Parte A. Servidor + cliente (no necesitas dos terminales)

**Primero, instalar y compilar el servidor:**

```powershell
cd 14_Practica_MCP/servidor
npm install
npm run build
```

**Después, abrir la carpeta hermana `cliente` y ejecutar el cliente:**

```powershell
cd ../cliente
npm install
npm start
```

Salida esperada (aproximada):

```text
¡Conexión establecida con el servidor MCP!
Herramientas descubiertas:
- suma: suma 2 numeros

Llamando a la herramienta 'suma' con los números 5 y 7...
El resultado devuelto es: 12
```

**IMPORTANTE:** no ejecutes el servidor en otra terminal: `StdioClientTransport` lo arranca automáticamente. La ruta relativa a `../servidor/build/index.js` sustituye a la ruta personal del profesor. Si ejecutas `node ...` desde otra carpeta en vez de `npm start` dentro de `cliente`, la ruta puede no resolverse; entra primero en `cliente`.

Si cambias código del servidor, vuelve a compilarlo con `npm run build` en `servidor`.

## Parte B. Cliente remoto de Jina

En `jina`, instala las dependencias:

```powershell
cd ../jina
npm install
```

Copia `.env.example` a `.env` y sustituye el valor de `jinaApiKey` por tu clave real. **No compartas ni subas el `.env` a GitHub**.

```powershell
Copy-Item .env.example .env
npm start
```

Este cliente accede al MCP remoto de Jina (`https://mcp.jina.ai/v1`) por HTTP. No hace falta que arranques un servidor local. La disponibilidad, cuota gratuita, nombre de las herramientas y respuesta pueden cambiar y dependen del servicio Jina.

## Comandos útiles

- `npm install`: instala las dependencias de esa carpeta.
- `npm run build`: compila TypeScript a JavaScript en `build/`.
- `npm start`: ejecuta el programa (en `cliente` y `jina`, compila primero).
- `Ctrl+C`: detiene un proceso que esté en ejecución.

## Archivos y materiales originales

- Servidor del profesor: https://github.com/fernandomartinez-neoland/-mcp
- Cliente del profesor (contiene `index.ts` y `index.jina.ts`): https://github.com/fernandomartinez-neoland/mcp_clientOctubre2026
- Guía oficial MCP (versión usada en clase): https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server#typescript
- SDK TypeScript oficial, revisión enlazada por el profesor: https://github.com/modelcontextprotocol/typescript-sdk/tree/5ee54ee30ddc00a914a3d981880f87fdce0e6246

En las versiones originales del profesor tienes además `GUIA.md`, `GUIA_MCP_CLIENT.md` y `GUIA_MCP_CLIENT_JINA.md`, más extensas. Este paquete incorpora `GUIA_ESTUDIO.md` con lo esencial para tu estructura.

## Diferencias respecto a los repositorios originales

- **No son tres repositorios**: el profesor tiene dos repositorios y dos variantes de cliente en el segundo.
- Se han convertido en **tres carpetas independientes** dentro de una práctica.
- La ruta absoluta local del profesor se ha cambiado por una ruta relativa entre tus carpetas.
- `jinaApiKey` se comprueba al iniciar y se carga desde `jina/.env`, nunca se incluye una credencial real.
- Se han eliminado residuos de demostración como `console.log("fila")`.
- Se han añadido scripts `start`, documentación y comentarios breves; la lógica de servidor `suma`, cliente local (5+7) y cliente Jina (`read_url`) se conserva.
- No se incluyen `node_modules` ni `package-lock.json`. La primera vez debes ejecutar `npm install` en cada carpeta: generará su propio lockfile.

## Estado de las pruebas

Se ha validado la estructura, el contenido JSON y la correspondencia entre rutas. **No se ha podido ejecutar `npm install` ni probar la conexión MCP/Jina en este entorno sin acceso a la red**. Tras instalar las dependencias en tu equipo, comprueba el funcionamiento mediante `npm start`; un fallo de Jina puede ser de clave, saldo o acceso a Internet y no del código.
