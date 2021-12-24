import express from 'express';
import mongoose from 'mongoose';
import {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
} from './controllers/categories.controller.js';
import productsRoutes from './routes/products.routes.js';

const server = express();
//Server Port
server.listen(4000, () => {
  console.log('Xmas-Server is up and running on Port 4000');
});

const connectionString = 'mongodb://localhost:27017/xmas-app';

mongoose.connect(connectionString);

server.use(express.json());

server.use(productsRoutes);

server.get('/categories', getCategories);
server.get('/categories/:categoryId', getCategory);
server.post('/categories', postCategory);
server.put('/categories/:categoryId', putCategory);
server.delete('/categories/:categoryId', deleteCategory);
