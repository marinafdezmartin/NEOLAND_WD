# API RAG para una tienda tecnológica

Práctica de bootcamp: una API REST que permite consultar, crear y buscar productos,
tanto mediante JSON como mediante lenguaje natural. El flujo RAG recupera productos
reales del catálogo, los reordena y proporciona esos datos al modelo que redacta la respuesta.

Este proyecto es una práctica de desarrollo. No está preparado para exposición pública:
no tiene autenticación ni controles de acceso a las altas en sus endpoints, y las peticiones
pueden consumir cuota de los proveedores de IA.

## Tecnologías

- Node.js con ES Modules y Express.
- Prisma CLI 8.0.0-rc.33 y runtime PostgreSQL 8.0.0-rc.23.
- PostgreSQL en Supabase y la extensión pgvector.
- Google `gemini-embedding-001`, con embeddings de 768 dimensiones.
- Jina `jina-reranker-v2-base-multilingual`, para reordenar candidatos.
- Groq SDK y `openai/gpt-oss-120b`, para clasificar intenciones y redactar respuestas.
- dotenv para cargar la configuración local; TypeScript y tsx como herramientas de desarrollo.

## Arquitectura

```text
index.js → Router → Controller → Service → Model → Prisma → PostgreSQL
```

Los routers definen los endpoints; los controladores reciben la petición y devuelven
el estado y el JSON del servicio. Los servicios validan y coordinan las operaciones.
El modelo realiza las consultas y altas exclusivamente en `db.orm.rag.Producto`.

```text
src/
  routes/       Rutas de productos y RAG
  controllers/  Adaptación de las peticiones y respuestas HTTP
  services/     Productos, embeddings, reranker, Groq y orquestación RAG
  models/       Acceso al catálogo
  prisma/       Cliente, contrato PSL y artefactos generados
  seed.js       Los 12 productos de ejemplo
```

La búsqueda genera un vector de la consulta con Google, solicita entre 10 y 40 candidatos
a pgvector y pide a Jina los más relevantes. Si Jina falla, conserva el orden de pgvector
y muestra un aviso en consola. Los productos sin embedding quedan fuera de la búsqueda
semántica, pero siguen apareciendo en el listado general.

Las respuestas públicas excluyen embeddings y utilizan `status`, `message` y `data`
cuando corresponde. Las búsquedas reordenadas por Jina incluyen `relevanceScore`.
Una intención `create` no confirma un alta: la confirmación requiere una inserción con HTTP 201.

## Requisitos previos

- Node.js 24, como mínimo 24.11.0. El desarrollo se ha verificado con Node.js 24.22.2.
  Node debe poder cargar el archivo TypeScript `src/prisma/db.ts`.
- npm.
- Una base PostgreSQL compatible con Prisma 8; la inicialización del proyecto exige PostgreSQL 15 o superior.
- La tabla `rag.productos`, la extensión `vector` instalada en `extensions` y una
  conexión con permisos para las operaciones de la práctica.
- Claves de Google, Jina y Groq para utilizar sus servicios.

## Instalación y entorno

Desde la carpeta `3_Backend/12_RAG_IA`:

```bash
npm install
```

Crea `.env` a partir de `.env.example` solo si todavía no lo tienes. Conserva el archivo
existente si ya está configurado. La plantilla contiene:

```dotenv
PORT=3000
DATABASE_URL=
GOOGLE_API_KEY=
JINA_API_KEY=
GROQ_API_KEY=
```

Completa los valores en tu `.env` local. No pegues claves ni cadenas de conexión reales
en el código, la documentación o las peticiones de ejemplo. `.env` está excluido por
los `.gitignore` del repositorio y del proyecto; `.env.example` debe conservarse sin secretos.
Reinicia el servidor después de cambiar las variables de entorno.

## Base compartida: esquema `rag` y pgvector

Esta base Supabase se comparte con la práctica Repaso Supabase. Sus tablas de `public`,
incluidas `User`, `Post` y `Producto`, deben conservarse intactas. Nuestro catálogo utiliza
otro esquema: el modelo `rag.Producto` se almacena en **`rag.productos`**.

El esquema `rag` separa las tablas, pero **no aísla los marcadores globales de Prisma 8**.
La configuración instalada utiliza `prisma_contract.marker`, con el espacio `app`, y
metadatos de historial compartidos. No debemos sustituir el marcador de la otra práctica.

### Comprobar la preparación existente

En la base de esta práctica, `rag.productos` y `extensions.vector` ya existen.
No vuelvas a crear la tabla ni cambies las políticas para arrancar la aplicación.
Estas consultas son de solo lectura y permiten inspeccionar la configuración manualmente:

```sql
SELECT e.extname, n.nspname AS esquema
FROM pg_extension AS e
JOIN pg_namespace AS n ON n.oid = e.extnamespace
WHERE e.extname = 'vector';

SELECT to_regclass('rag.productos') AS tabla,
       to_regtype('extensions.vector') AS tipo_vector;

SHOW search_path;

SELECT to_regtype('vector') = to_regtype('extensions.vector') AS vector_correcto;
```

La extensión debe encontrarse en `extensions`. La conexión usada por Node debe resolver
ese tipo y sus operadores mediante `search_path`; comprobarlo en SQL Editor no garantiza
que otra conexión tenga la misma configuración. Si falta la extensión, está en otro esquema
o faltan permisos, revisa la configuración antes de continuar. No traslades una extensión compartida.

### SQL equivalente al contrato actual

El siguiente DDL se deriva de `src/prisma/contract.prisma`, su contrato generado y los tipos
del SQL local: `Int` → `int4`, `Float` → `float8`, `String` → `text`, y embedding opcional
→ `extensions.vector(768)`. No es una exportación del catálogo remoto ni crea metadatos de Prisma.

**Únicamente para preparar un entorno nuevo, tras revisar que la tabla no existe.**
Si `vector` todavía no está habilitada en ese entorno Supabase, habilítala en el esquema
`extensions` desde el Dashboard. El esquema de la extensión debe existir antes de instalarla;
la forma SQL equivalente es:

```sql
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;
```

Después, el DDL del catálogo es:

```sql
CREATE SCHEMA IF NOT EXISTS "rag";

CREATE TABLE "rag"."productos" (
  "id" SERIAL NOT NULL,
  "nombre" text NOT NULL,
  "precio" float8 NOT NULL,
  "cantidad" int4 NOT NULL,
  "descripcion" text NOT NULL,
  "embedding" "extensions"."vector"(768),
  PRIMARY KEY ("id")
);
```

`CREATE TABLE` no lleva `IF NOT EXISTS`: si la tabla ya existe, se detiene en lugar de
dar por compatible una definición que podría ser distinta. Este SQL solo describe la tabla:
no reproduce políticas RLS ni concede permisos. En la base actual RLS está activado;
conserva sus políticas y permisos. En otro entorno, revisa los accesos por separado,
sin desactivar RLS para solucionar errores ni cambiar los permisos de la práctica anterior.

### Migración antigua: no ejecutar

`migrations/app/20261116T1533_crear_productos/` pertenece a una fase anterior y todavía
crea **`public.productos`**. Es obsoleta para este proyecto y peligrosa para la base compartida.
Se conserva sin modificaciones como parte del historial local; no sirve para preparar `rag.productos`.
Los archivos de `migrations/pgvector/` tampoco deben aplicarse sin revisar el historial compartido.

**No ejecutes las migraciones antiguas ni `prisma db update` sobre esta base. Tampoco
uses `prisma db migrate`, `prisma db init` o `prisma db sign` para saltarte el conflicto
de marcadores.** No borres ni reescribas los metadatos de la otra práctica.

`prisma-8.md` es documentación genérica generada por Prisma: sus ejemplos de inicialización
no son instrucciones de preparación para nuestra base compartida. Para este proyecto
prevalecen las restricciones y el esquema descritos aquí.

## Arranque y scripts

```bash
npm run dev
```

El servidor escucha por defecto en `http://localhost:3000`. Para arrancarlo sin modo watch:

```bash
npm start
```

- `start`: ejecuta `index.js`.
- `dev`: ejecuta el servidor con reinicio al cambiar los archivos.
- `seed`: ejecuta la carga de ejemplos descrita más abajo.
- `contract:emit`: regenera `contract.json` y `contract.d.ts` localmente; no crea tablas
  ni resuelve el conflicto de marcadores. No es necesario para el arranque habitual.

No existe actualmente una suite automatizada de pruebas. Se ha retirado el script
provisional `test`, que siempre terminaba con error. La verificación realizada durante
el desarrollo incluyó comprobaciones estáticas y pruebas manuales con Postman.

## Endpoints y ejemplos

En Postman utiliza `http://localhost:3000` como base. Para los POST selecciona
**Body → raw → JSON**, con `Content-Type: application/json`.

| Método | Ruta | Función |
| --- | --- | --- |
| GET | `/` | Estado del servidor |
| GET | `/api/productos` | Lista del catálogo |
| POST | `/api/productos` | Crea un producto y genera su embedding |
| GET | `/api/productos/buscar?q=...&limit=5` | Búsqueda semántica con reranker |
| POST | `/api/rag` | Interacción en lenguaje natural |

### Lecturas

```text
GET http://localhost:3000/
GET http://localhost:3000/api/productos
GET http://localhost:3000/api/productos/buscar?q=auriculares%20para%20musica&limit=3
```

`limit` admite enteros entre 1 y 20 y vale 5 por defecto. Los resultados se devuelven en
`data`; si Jina ha reordenado la búsqueda, cada producto incluye `relevanceScore`.
Si se usa el fallback, la búsqueda sigue devolviendo HTTP 200 y aparece un aviso en consola.

### Crear mediante REST

Esta petición sí escribe un producto y consume cuota de Google:

```text
POST http://localhost:3000/api/productos
```

```json
{
  "nombre": "Teclado compacto de prueba",
  "precio": 30,
  "cantidad": 5,
  "descripcion": "Teclado USB compacto para trabajo de oficina"
}
```

Los textos deben ser no vacíos, `precio` un número finito no negativo y `cantidad`
un entero no negativo. Se esperan HTTP 201 y el producto creado en `data`, sin su embedding.
El cliente no necesita enviar el vector: el servicio lo genera y exige 768 valores finitos.
Si Google falla, no se guarda el producto.

### Interactuar mediante RAG

Empieza con una petición de solo lectura:

```text
POST http://localhost:3000/api/rag
```

```json
{ "prompt": "Muéstrame todos los productos de la tienda" }
```

También puedes buscar:

```json
{ "prompt": "Necesito unos auriculares para escuchar música" }
```

Las lecturas devuelven HTTP 200, un `message` conversacional, `total` y la lista en `data`.
La búsqueda RAG utiliza un límite de 5 productos. Se aceptan `query`, `message` y `mensaje`
como alternativas a `prompt`.

Esta petición de alta está incompleta y debe devolver HTTP 400 con `data.campos_faltantes`:

```json
{ "prompt": "Quiero añadir un teclado de 30 euros y 5 unidades" }
```

Para crear un producto completo, añade los datos explícitos; esta petición sí escribe:

```json
{
  "prompt": "Registra un producto nuevo",
  "nombre": "Teclado compacto de prueba RAG",
  "precio": 30,
  "cantidad": 5,
  "descripcion": "Teclado USB compacto para trabajo de oficina"
}
```

Los datos explícitos tienen prioridad sobre los extraídos por Groq. Los campos ausentes
no se rellenan con valores inventados. Una inserción confirmada devuelve HTTP 201;
si falla la redacción amigable posterior, se conserva ese estado con una confirmación segura.

Una petición ajena a la tienda recibe HTTP 400 con orientación de uso, sin cambios en el catálogo:

```json
{ "prompt": "¿Qué tiempo hace hoy?" }
```

Para verificar manualmente la dimensión de los embeddings sin imprimirlos:

```sql
SELECT id, nombre, embedding IS NOT NULL AS tiene_embedding,
       extensions.vector_dims(embedding) AS dimensiones
FROM rag.productos
ORDER BY id;
```

## Seed

```bash
npm run seed
```

`src/seed.js` contiene los 12 productos del profesor y reutiliza `createProductService()`.
Consulta primero los nombres existentes, ignorando mayúsculas y espacios exteriores,
y omite los ya registrados. No actualiza registros antiguos ni rellena sus embeddings nulos.

**El seed escribe en `rag.productos` y utiliza la API de Google para cada alta pendiente:
puede consumir cuota y generar costes del proveedor.** Para este script son necesarias
`DATABASE_URL` y `GOOGLE_API_KEY`; no utiliza Jina ni Groq.

Muestra los totales de insertados, omitidos y fallidos, sin imprimir vectores, y cierra
el cliente de base de datos al terminar. Ejecútalo en una sola instancia: la comprobación
por nombre evita duplicados en ejecuciones sucesivas, pero no sustituye una restricción
de unicidad frente a procesos concurrentes.

## Alcance y limitaciones

- No hay frontend, autenticación ni protección de cuota mediante límites de peticiones.
- El catálogo no se modifica ni elimina mediante acciones RAG: solo se lista, busca o crea.
- Las respuestas HTTP no incluyen claves ni detalles internos de las excepciones.
- La redacción de Groq recibe datos públicos y reglas de fundamentación; debe revisarse
  si se amplía el uso más allá de la práctica, ya que sigue siendo texto generado por un modelo.
- Los scripts temporales de conexión y pruebas manuales se han retirado; no forman parte del servidor.
- Conserva `package-lock.json`, el contrato PSL y sus archivos generados. No elimines
  historiales o snapshots para intentar resolver la discrepancia de la base compartida.
