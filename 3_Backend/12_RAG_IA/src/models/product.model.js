import { db } from '../prisma/db.ts';

export const getProductsModel = async () => {
  // Selecciona solo los campos públicos del producto.
  return db.orm.rag.Producto
    .select('id', 'nombre', 'precio', 'cantidad', 'descripcion')
    .all();
};

export const createProductModel = async ({ nombre, precio, cantidad, descripcion }) => {
  return db.orm.rag.Producto
    .select('id', 'nombre', 'precio', 'cantidad', 'descripcion')
    .create({
      nombre,
      precio,
      cantidad,
      descripcion,
      // El embedding se generará en una fase posterior.
      embedding: null,
    });
};
