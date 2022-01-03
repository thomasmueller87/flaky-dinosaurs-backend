import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import productsRoutes from './routes/products.routes.js';
import catergoryRoutes from './routes/categories.routes.js';

const server = express();
//Server Port
server.listen(4000, () => {
  console.log('Xmas-Server is up and running on Port 4000');
});

const connectionString = 'mongodb://localhost:27017/xmas-app';

mongoose.connect(connectionString);

server.use(express.json());
server.use(cors());

server.use(productsRoutes);
server.use(catergoryRoutes);
