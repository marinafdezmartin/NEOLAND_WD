import { Router } from 'express';
import { ragController } from '../controllers/rag.controller.js';

const ragRouter = Router();

ragRouter.post('/', ragController);

export default ragRouter;
