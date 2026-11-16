import { ragService } from '../services/rag.service.js';

export const ragController = async (req, res) => {
  const respuesta = await ragService(req.body);
  return res.status(respuesta.status).json(respuesta);
};
