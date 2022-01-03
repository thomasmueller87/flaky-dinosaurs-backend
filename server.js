import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import productsRoutes from './routes/products.routes.js';
import catergoryRoutes from './routes/categories.routes.js';

dotenv.config();

const server = express();
//Server Port
const serverPort = process.env.SERVER_PORT || 4000;
server.listen(serverPort, () => {
  console.log(
    `Xmas-Server is up and running on Port ${serverPort}`
  );
});

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

//For connect to localhost
//const connectionString = 'mongodb://localhost:27017/xmas-app';

mongoose.connect(connectionString);

server.use(express.json());
server.use(cors());

server.use(productsRoutes);
server.use(catergoryRoutes);
