import express from 'express'
import { addProduct } from '../controllers/addProduct';

const productRouter = express.Router();

productRouter.post('/addProduct', addProduct);

export default productRouter;