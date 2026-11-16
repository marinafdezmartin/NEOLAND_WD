import { getProductsModel, createProductModel, getNearestProductsModel } from '../models/product.model.js';
import { embeddingService } from './embedding.service.js';
import { rerankerService } from './reranker.service.js';

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
    const datosProducto = {
      nombre: nombre.trim(),
      precio,
      cantidad,
      descripcion: descripcion.trim(),
    };

    // Genera el vector antes de guardar el producto.
    const resultadoEmbedding = await embeddingService(datosProducto);

    if (resultadoEmbedding.status !== 200) {
      return {
        status: resultadoEmbedding.status,
        message: 'No se pudo generar el embedding. El producto no se ha guardado.',
      };
    }

    const embedding = resultadoEmbedding.message;

    if (!Array.isArray(embedding) || embedding.length !== 768 || !embedding.every(Number.isFinite)) {
      return { status: 502, message: 'El embedding recibido no es válido. El producto no se ha guardado.' };
    }

    const nuevoProducto = await createProductModel({ ...datosProducto, embedding });

    return { status: 201, message: 'Producto creado correctamente.', data: nuevoProducto };
  } catch {
    return { status: 500, message: 'No se pudo crear el producto.' };
  }
};

export const searchProductsService = async (query, limit = 5) => {
  if (typeof query !== 'string' || !query.trim()) {
    return { status: 400, message: 'La búsqueda debe ser un texto no vacío.' };
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 20) {
    return { status: 400, message: 'El límite debe ser un número entero entre 1 y 20.' };
  }

  try {
    const resultadoEmbedding = await embeddingService(query.trim());

    if (resultadoEmbedding.status !== 200) {
      return {
        status: resultadoEmbedding.status,
        message: 'No se pudo generar el embedding de la búsqueda.',
      };
    }

    const vector = resultadoEmbedding.message;

    if (!Array.isArray(vector) || vector.length !== 768 || !vector.every(Number.isFinite)) {
      return { status: 502, message: 'El embedding recibido para la búsqueda no es válido.' };
    }

    const candidatePoolSize = Math.min(Math.max(limit * 2, 10), 40);
    const candidatos = await getNearestProductsModel(vector, candidatePoolSize);
    const productos = candidatos.map(({ id, nombre, precio, cantidad, descripcion }) => ({
      id, nombre, precio, cantidad, descripcion,
    }));

    if (productos.length === 0) {
      return { status: 200, message: 'Búsqueda realizada correctamente.', data: [] };
    }

    const documents = productos.map((producto) =>
      `${producto.nombre}: ${producto.descripcion}. Precio: ${producto.precio} euros. Stock: ${producto.cantidad}.`,
    );
    const topN = Math.min(limit, productos.length);

    try {
      const resultadoReranker = await rerankerService({ query: query.trim(), documents, top_n: topN });
      const ranking = resultadoReranker.message;
      const indices = new Set();

      // Valida toda la clasificación antes de utilizar sus índices.
      const rankingValido = resultadoReranker.status === 200
        && Array.isArray(ranking)
        && ranking.length === topN
        && ranking.every((item) => {
          if (!item || !Number.isInteger(item.index) || item.index < 0 || item.index >= productos.length
            || !Number.isFinite(item.relevance_score) || indices.has(item.index)) {
            return false;
          }

          indices.add(item.index);
          return true;
        });

      if (rankingValido) {
        const reordenados = ranking.map((item) => ({
          ...productos[item.index],
          relevanceScore: item.relevance_score,
        }));

        return { status: 200, message: 'Búsqueda realizada correctamente.', data: reordenados };
      }
    } catch {
      // Una excepción del reranker también permite utilizar el fallback.
    }

    console.warn('No se pudo utilizar Jina. Se devuelve el orden de pgvector (fallback).');
    return { status: 200, message: 'Búsqueda realizada correctamente.', data: productos.slice(0, limit) };
  } catch {
    return { status: 500, message: 'No se pudo realizar la búsqueda de productos.' };
  }
};
