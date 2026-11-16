import { classifyIntent, generateFriendlyResponse } from './groq.service.js';
import { getProductsService, searchProductsService, createProductService } from './product.service.js';

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const errorStatus = (status) => Number.isInteger(status) && status >= 400 && status <= 599 ? status : 502;

const validProduct = (producto) => isObject(producto)
  && Number.isInteger(producto.id) && producto.id > 0
  && typeof producto.nombre === 'string' && Boolean(producto.nombre.trim())
  && typeof producto.descripcion === 'string' && Boolean(producto.descripcion.trim())
  && Number.isFinite(producto.precio) && producto.precio >= 0
  && Number.isInteger(producto.cantidad) && producto.cantidad >= 0;

// Devuelve solo los campos públicos, conservando la puntuación de Jina si existe.
const publicProduct = (producto) => ({
  id: producto.id,
  nombre: producto.nombre,
  precio: producto.precio,
  cantidad: producto.cantidad,
  descripcion: producto.descripcion,
  ...(Number.isFinite(producto.relevanceScore) ? { relevanceScore: producto.relevanceScore } : {}),
});

const friendlyMessage = async (params, fallback) => {
  try {
    const message = await generateFriendlyResponse(params);
    return typeof message === 'string' && message.trim() ? message.trim() : fallback;
  } catch {
    return fallback;
  }
};

export const ragService = async (payload) => {
  if (!isObject(payload)) {
    return { status: 400, message: 'Envía un objeto JSON con el texto de tu petición.' };
  }

  const text = [payload.prompt, payload.query, payload.message, payload.mensaje]
    .find((value) => typeof value === 'string' && value.trim());

  if (!text) {
    return { status: 400, message: 'Indica un texto no vacío en prompt, query, message o mensaje.' };
  }

  const userText = text.trim();

  try {
    const classification = await classifyIntent(userText, payload);
    if (classification?.status !== 200) {
      return { status: errorStatus(classification?.status), message: 'No se pudo interpretar la petición.' };
    }

    const intent = classification.message;
    if (!intent || typeof intent !== 'object' || Array.isArray(intent)
      || !['list_all', 'search', 'create', 'unknown'].includes(intent.action)
      || (intent.search_query != null && typeof intent.search_query !== 'string')
      || (intent.product_data != null && !isObject(intent.product_data))
      || (intent.action === 'create' && !isObject(intent.product_data))) {
      return { status: 502, message: 'No se pudo interpretar la petición correctamente.' };
    }

    const { action } = intent;

    if (action === 'list_all' || action === 'search') {
      const query = typeof intent.search_query === 'string' && intent.search_query.trim()
        ? intent.search_query.trim() : userText;
      const result = action === 'list_all' ? await getProductsService() : await searchProductsService(query, 5);

      if (result?.status !== 200) {
        return { status: errorStatus(result?.status), message: 'No se pudieron consultar los productos.' };
      }
      if (!Array.isArray(result.data) || !result.data.every(validProduct)) {
        return { status: 502, message: 'No se pudo obtener una lista de productos válida.' };
      }

      // map conserva el orden de Jina o del fallback de pgvector.
      const productos = result.data.map(publicProduct);
      const message = await friendlyMessage(
        { userText, action, results: productos },
        productos.length ? 'Aquí tienes los productos encontrados.' : 'No se han encontrado productos.',
      );

      return { status: 200, message, total: productos.length, data: productos };
    }

    if (action === 'create') {
      if (payload.product_data !== undefined && !isObject(payload.product_data)) {
        return { status: 400, message: 'product_data debe ser un objeto con los datos del producto.' };
      }

      const fields = ['nombre', 'precio', 'cantidad', 'descripcion'];
      const explicit = payload.product_data ?? {};
      const producto = Object.fromEntries(fields.map((field) => [
        field,
        Object.hasOwn(payload, field) ? payload[field]
          : Object.hasOwn(explicit, field) ? explicit[field] : intent.product_data[field],
      ]));

      // Los valores cero son válidos; null y los textos vacíos no completan un campo.
      const faltantes = fields.filter((field) => producto[field] == null
        || (typeof producto[field] === 'string' && !producto[field].trim()));
      if (faltantes.length > 0) {
        return {
          status: 400,
          message: `Faltan campos obligatorios: ${faltantes.join(', ')}.`,
          data: { campos_faltantes: faltantes },
        };
      }

      const invalidos = [];
      if (typeof producto.nombre !== 'string') invalidos.push('nombre');
      if (typeof producto.descripcion !== 'string') invalidos.push('descripcion');
      if (!Number.isFinite(producto.precio) || producto.precio < 0) invalidos.push('precio');
      if (!Number.isInteger(producto.cantidad) || producto.cantidad < 0) invalidos.push('cantidad');
      if (invalidos.length > 0) {
        return {
          status: 400,
          message: `Revisa los campos: ${invalidos.join(', ')}. Los textos deben ser válidos, el precio no negativo y la cantidad entera no negativa.`,
          data: { campos_invalidos: invalidos },
        };
      }

      const result = await createProductService({
        nombre: producto.nombre.trim(),
        precio: producto.precio,
        cantidad: producto.cantidad,
        descripcion: producto.descripcion.trim(),
      });

      if (result?.status !== 201 || !validProduct(result.data)) {
        return { status: errorStatus(result?.status), message: 'No se pudo confirmar el resultado del registro.' };
      }

      const creado = publicProduct(result.data);
      const message = await friendlyMessage(
        { userText, action, results: { status: 201, data: creado } },
        'Producto registrado correctamente.',
      );

      return { status: 201, message, data: creado };
    }

    const message = await friendlyMessage(
      { userText, action: 'unknown' },
      'Puedo ayudarte a consultar el catálogo, buscar productos o registrar uno nuevo.',
    );
    return { status: 400, message };
  } catch {
    return { status: 500, message: 'No se pudo procesar la petición de la tienda.' };
  }
};
