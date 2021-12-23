import express from 'express';
import mongoose from 'mongoose';
import Dino from './models/dino.model.js';

import {
  getDinos,
  getDino,
  postDino,
  putDino,
  deleteDino,
} from './controllers/dinos.controller.js';

const server = express();
//Server Port
server.listen(4000, () => {
  console.log('Dino-Server is up and running on Port 4000');
});

const connectionString =
  'mongodb://localhost:27017/flaky-dinosaurs';

mongoose.connect(connectionString);

server.use(express.json());
//Alle Dinos holen
server.get('/dinos', getDinos);

//Einzelne Dinos mit ID laden
server.get('/dinos/:dinoId', getDino);

//Erstelle neuen Dino
server.post('/dinos', postDino);
//Aendere Dino
server.put('/dinos/:dinoId', putDino);
//Delete Dino
server.delete('/dinos/:dinoId', deleteDino);
