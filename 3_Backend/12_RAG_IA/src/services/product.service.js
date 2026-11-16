import { getProductsModel, createProductModel } from '../models/product.model.js';

export const getProductsService = async () => {
  try {
    const productos = await getProductsModel();
    return { status: 200, message: 'Productos obtenidos correctamente.', data: productos };
  } catch {
    return { status: 500, message: 'No se pudieron consultar los productos.' };
  }
};

export const createProductService = async (producto) => {
  if (!producto || typeof producto !== 'object' || Array.isArray(producto)) {
    return { status: 400, message: 'Debes enviar un objeto JSON con los datos del producto.' };
  }

  const { nombre, precio, cantidad, descripcion } = producto;

  if (typeof nombre !== 'string' || !nombre.trim()) {
    return { status: 400, message: 'El nombre debe ser un texto no vacío.' };
  }

  if (typeof descripcion !== 'string' || !descripcion.trim()) {
    return { status: 400, message: 'La descripcion debe ser un texto no vacío.' };
  }

  if (!Number.isFinite(precio) || precio < 0) {
    return { status: 400, message: 'El precio debe ser un número finito no negativo.' };
  }

  if (!Number.isInteger(cantidad) || cantidad < 0) {
    return { status: 400, message: 'La cantidad debe ser un número entero no negativo.' };
  }

  try {
    // Envía al modelo únicamente los campos permitidos y limpia los textos.
    const nuevoProducto = await createProductModel({
      nombre: nombre.trim(),
      precio,
      cantidad,
      descripcion: descripcion.trim(),
    });

    return { status: 201, message: 'Producto creado correctamente.', data: nuevoProducto };
  } catch {
    return { status: 500, message: 'No se pudo crear el producto.' };
  }
};
