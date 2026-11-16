import { getProductsService, createProductService } from '../services/product.service.js';

export const getProductsController = async (req, res) => {
  const respuesta = await getProductsService();
  return res.status(respuesta.status).json(respuesta);
};

export const createProductController = async (req, res) => {
  const respuesta = await createProductService(req.body);
  return res.status(respuesta.status).json(respuesta);
};
