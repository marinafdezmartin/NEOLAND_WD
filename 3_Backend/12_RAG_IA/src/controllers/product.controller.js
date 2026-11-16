import { getProductsService, createProductService, searchProductsService } from '../services/product.service.js';

export const getProductsController = async (req, res) => {
  const respuesta = await getProductsService();
  return res.status(respuesta.status).json(respuesta);
};

export const createProductController = async (req, res) => {
  const respuesta = await createProductService(req.body);
  return res.status(respuesta.status).json(respuesta);
};

export const searchProductsController = async (req, res) => {
  const limiteRecibido = req.query.limit;

  // Rechaza decimales, valores fuera de rango y parámetros repetidos.
  if (limiteRecibido !== undefined
    && (typeof limiteRecibido !== 'string' || !/^(?:[1-9]|1[0-9]|20)$/.test(limiteRecibido))) {
    return res.status(400).json({
      status: 400,
      message: 'El límite debe ser un número entero entre 1 y 20.',
    });
  }

  const limit = limiteRecibido === undefined ? 5 : Number(limiteRecibido);
  const respuesta = await searchProductsService(req.query.q, limit);
  return res.status(respuesta.status).json(respuesta);
};
