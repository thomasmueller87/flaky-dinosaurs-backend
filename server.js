import express from 'express';
import mongoose from 'mongoose';
import {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} from './controllers/products.controller.js';

const server = express();
//Server Port
server.listen(4000, () => {
  console.log('Xmas-Server is up and running on Port 4000');
});

const connectionString = 'mongodb://localhost:27017/xmas-app';

mongoose.connect(connectionString);

server.use(express.json());

server.get('/products', getProducts);
server.get('/products/:productId', getProduct);
server.post('/products', postProduct);
server.put('/products/:productId', putProduct);
server.delete('/products/:productId', deleteProduct);
