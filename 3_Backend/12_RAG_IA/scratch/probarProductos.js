import { db } from '../src/prisma/db.ts';

try {
  // Consulta los productos sin modificar la tabla.
  const productos = await db.orm.rag.Producto.all();
  console.log(productos);
} catch (error) {
  // Muestra el código del error sin imprimir datos de conexión.
  console.error('Error al consultar productos. Código:', error?.code ?? 'DESCONOCIDO');
  process.exitCode = 1;
} finally {
  // Cierra el cliente para que el proceso pueda terminar.
  await db.close();
}
