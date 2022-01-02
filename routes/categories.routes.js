import express from 'express';
import {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
} from '../controllers/categories.controller.js';

const router = express.Router();

//comment

router.get('/categories', getCategories);
router.get('/categories/:categoryId', getCategory);
router.post('/categories', postCategory);
router.put('/categories/:categoryId', putCategory);
router.delete('/categories/:categoryId', deleteCategory);

export default router;
