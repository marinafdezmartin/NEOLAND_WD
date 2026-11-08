// IMPORTACIONES
import { verifyDashboardService } from "../services/dashboard.service.js";

export function verifyDashboardController(req, res) {
  // Recogemos los dos datos enviados desde Postman
  const idUsuario = req.body.idUsuario;
  const skuProducto = req.body.skuProducto;

  // Pasamos ambos datos al servicio
  const resultado = verifyDashboardService(idUsuario, skuProducto);

  // Devolvemos el resultado a Postman
  res.status(200).json(resultado);
}
