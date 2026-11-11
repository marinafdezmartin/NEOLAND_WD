import {
  createProductoService,
  getProductosService,
  getProductoByIdService,
  updateProductoService,
  deleteProductoService,
} from "../services/producto.service.js";

// Comprueba que el body contenga solo campos validos de Producto.
function datosInvalidos(body, parcial = false) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return true;

  const campos = Object.keys(body);
  const permitidos = ["nombre", "precio", "disponible"];

  if (campos.length === 0 || campos.some((campo) => !permitidos.includes(campo))) {
    return true;
  }
  if (!parcial && (!Object.hasOwn(body, "nombre") || !Object.hasOwn(body, "precio"))) {
    return true;
  }
  if ("nombre" in body && (typeof body.nombre !== "string" || !body.nombre.trim())) {
    return true;
  }
  if ("precio" in body && (typeof body.precio !== "number" || !Number.isFinite(body.precio) || body.precio < 0)) {
    return true;
  }
  if ("disponible" in body && typeof body.disponible !== "boolean") {
    return true;
  }

  return false;
}

function obtenerId(req) {
  const id = Number(req.params.id);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function createProductoController(req, res) {
  try {
    if (datosInvalidos(req.body)) {
      return res.status(400).json({ mensaje: "Datos de producto incorrectos" });
    }
    const producto = await createProductoService(req.body);
    res.status(201).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el producto" });
  }
}

export async function getProductosController(req, res) {
  try {
    const productos = await getProductosService();
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al consultar los productos" });
  }
}

export async function getProductoByIdController(req, res) {
  try {
    const id = obtenerId(req);
    if (id === null) return res.status(400).json({ mensaje: "ID incorrecto" });

    const producto = await getProductoByIdService(id);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al consultar el producto" });
  }
}

export async function updateProductoController(req, res) {
  try {
    const id = obtenerId(req);
    if (id === null) return res.status(400).json({ mensaje: "ID incorrecto" });
    if (datosInvalidos(req.body, true)) {
      return res.status(400).json({ mensaje: "Datos de actualizacion incorrectos" });
    }

    const producto = await updateProductoService(id, req.body);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar el producto" });
  }
}

export async function deleteProductoController(req, res) {
  try {
    const id = obtenerId(req);
    if (id === null) return res.status(400).json({ mensaje: "ID incorrecto" });

    const producto = await deleteProductoService(id);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

    res.status(200).json({ mensaje: "Producto eliminado", producto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar el producto" });
  }
}
