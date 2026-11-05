// IMPORTACIONES
import { searchProductService } from "../services/product.service.js";

// Función que gestiona la petición POST
export function searchProductController(req, res) {
  // Recogemos el SKU enviado desde Postman
  const sku = req.body.skuBusqueda;

  // Pasamos el SKU al servicio
  const resultado = searchProductService(sku);

  // Devolvemos el resultado a Postman
  res.status(200).json(resultado);
}
