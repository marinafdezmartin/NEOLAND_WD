import { Router } from 'express';
import { getProductsController, createProductController, searchProductsController } from '../controllers/product.controller.js';

const productRouter = Router();

// Coloca las rutas fijas antes de futuras rutas como /:id.
productRouter.get('/buscar', searchProductsController);
productRouter.get('/', getProductsController);
productRouter.post('/', createProductController);

export default productRouter;
