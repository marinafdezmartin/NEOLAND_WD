import { Router } from 'express';
import { getProductsController, createProductController } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.get('/', getProductsController);
productRouter.post('/', createProductController);

export default productRouter;
