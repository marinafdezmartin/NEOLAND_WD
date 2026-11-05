// IMPORTACIONES
import { getProductBySkuModel } from "../model/product.model.js";

// Función que recibe el SKU desde el controlador
export function searchProductService(sku) {
  // Pasamos el SKU al modelo y devolvemos su resultado
  return getProductBySkuModel(sku);
}
