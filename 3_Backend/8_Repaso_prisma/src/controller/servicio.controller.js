import {
  getServiceService,
  createServiceService,
  updateServiceService,
  deleteServiceService,
} from "../services/servicio.service.js";

export async function getServiceController(req, res) {
  try {
    const servicio = await getServiceService();
    res.status(200).json(servicio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al consultar el servicio" });
  }
}

export async function createServiceController(req, res) {
  try {
    const body = await createServiceService(req.body);
    res.status(201).json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el servicio" });
  }
}

export async function updateServiceController(req, res) {
  try {
    const { id } = req.params;
    const actualizacion = req.body;
    res.status(200).json(await updateServiceService(id, actualizacion));
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar el servicio" });
  }
}

export async function deleteServiceController(req, res) {
  try {
    const { id } = req.params;
    res.status(200).json(await deleteServiceService(id));
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al borrar el servicio" });
  }
}
