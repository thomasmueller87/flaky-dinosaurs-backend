import express from 'express';
import {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} from '../controllers/products.controller.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:productId', getProduct);
router.post('/products', postProduct);
router.put('/products/:productId', putProduct);
router.delete('/products/:productId', deleteProduct);

export default router;
