import express from 'express';
import mongoose from 'mongoose';
import Dino from './models/dino.model.js';

const server = express();

mongoose.connect('mongodb://localhost:27017/flaky-dinosaurs');

server.use(express.json());
//Alle Dinos holen
server.get('/dinos', async (req, res) => {
  const dinos = await Dino.find();
  res.json(dinos);
});
//Einzelne Dinos mit ID laden
server.get('/dinos/:dinoId', async (req, res) => {
  const dinoId = req.params.dinoId;
  const dino = await Dino.findById(dinoId);
  res.json(dino);
});

//Erstelle neuen Dino
server.post('/dinos', async (req, res) => {
  const dinosaur = new Dino({
    name: req.body.name,
    type: req.body.type,
    vegan: req.body.vegan,
  });

  try {
    const result = await dinosaur.save();
    // Ergebnis auswerten und ID an den Nutzer senden.
    res.json({
      message:
        'Successfully inserted a new dino with ID: ' +
        result._Id,
    });
  } catch (error) {
    res.json(error);
  }
});

server.put('/dinos/:dinoId', async (req, res) => {
  const dinoId = req.params.dinoId;
  const dino = req.body;
  //Dino suchen und updaten. Parameter: (ID, Dino, { Zeige den geänderten Satz an})
  const result = await Dino.findByIdAndUpdate(dinoId, dino, {
    returnDocument: 'after',
  });
  res.json(result);
});

server.delete('/dinos/:dinoId', async (req, res) => {
  const dinoId = req.params.dinoId;
  try {
    const result = await Dino.findByIdAndDelete(dinoId);
    if (result) {
      res.json({
        success: true,
        status: 'Dino successfully deleted',
      });
    } else {
      res.json({
        success: false,
        status: 'Deletion went wrong!',
      });
    }
  } catch (error) {
    res.json({ status: 'Something went wrong!' });
  }
});

server.listen(4000, () => {
  console.log('Dino-Server is up and running');
});
