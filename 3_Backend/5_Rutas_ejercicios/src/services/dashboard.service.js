// IMPORTACIONES
import { findUserByIdModel } from "../model/user.model.js";
import { getProductBySkuModel } from "../model/product.model.js";

// Función que recibe 2 parametros,  el ID del usuario y el SKU del producto
export function verifyDashboardService(idUsuario, skuProducto) {
  // Llamamos al modelo de usuarios
  const datosUsuario = findUserByIdModel(idUsuario);

  // Llamamos al modelo de productos
  const datosProducto = getProductBySkuModel(skuProducto);

  // Devolvemos un objeto con los dos resultados
  return {
    cliente: datosUsuario,
    productoDeseado: datosProducto,
  };
}
