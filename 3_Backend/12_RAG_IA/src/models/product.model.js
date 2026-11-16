import { db } from '../prisma/db.ts';

export const getProductsModel = async () => {
  // Selecciona solo los campos públicos del producto.
  return db.orm.rag.Producto
    .select('id', 'nombre', 'precio', 'cantidad', 'descripcion')
    .all();
};

export const createProductModel = async ({ nombre, precio, cantidad, descripcion, embedding }) => {
  return db.orm.rag.Producto
    .select('id', 'nombre', 'precio', 'cantidad', 'descripcion')
    .create({
      nombre,
      precio,
      cantidad,
      descripcion,
      // Prisma convierte el array al formato vector de PostgreSQL.
      embedding,
    });
};

export const getNearestProductsModel = async (vector, limit = 5) => {
  return db.orm.rag.Producto.using
    .embedding_nearest(vector)
    // Un producto sin embedding no puede compararse semánticamente.
    .where((producto) => producto.embedding.isNotNull())
    .select('id', 'nombre', 'precio', 'cantidad', 'descripcion')
    .limit(limit)
    .all();
};
