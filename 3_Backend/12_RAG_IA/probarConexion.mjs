import "dotenv/config";
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10000,
});

try {
  await client.connect();

  const resultado = await client.query(
    "SELECT current_database() AS base_datos, current_schema() AS esquema",
  );

  console.log("Conexión correcta con Supabase");
  console.log(resultado.rows);
} catch (error) {
  console.error("Error de conexión:", error.code, error.message);
} finally {
  await client.end();
}
