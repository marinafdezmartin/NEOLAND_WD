import {
  getProductService,
  createProductService,
  updateProductService,
  deleteProductoService,
} from "../services/product.service.js";

export async function getProductController(req, res) {
  try {
    const product = await getProductService();
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en la consulta del producto" });
  }
}

export async function createProductController(req, res) {
  try {
    const body = await createProductService(req.body);
    res.status(201).json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en la creación del producto" });
  }
}

export async function updateProductController(req, res) {
  try {
    const { id } = req.params;
    const actualizacion = req.body;
    const producto = await updateProductService(id, actualizacion);
    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en la actualización del producto" });
  }
}

export async function deleteProductController(req, res) {
  try {
    const { id } = req.params;
    const producto = await deleteProductoService(id);
    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al borrar el producto" });
  }
}
