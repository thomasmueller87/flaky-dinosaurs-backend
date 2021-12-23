import express from "express";
import { ObjectId } from "mongodb";
import databaseClient from "./lib/db.client.js";

const server = express();

server.use(express.json());

server.get("/dinos/:dinoId", async (req, res) => {
  const dinoId = req.params.dinoId;

  await databaseClient.connect();
  const db = databaseClient.db("flaky-dinosaurs");
  const collection = db.collection("dinosaurs");

  const dino = await collection.findOne({ _id: ObjectId(dinoId) });
  res.json(dino);
});

server.get("/dinos", async (req, res) => {
  await databaseClient.connect();
  const db = databaseClient.db("flaky-dinosaurs");
  const collection = db.collection("dinosaurs");

  const dinos = await collection.find().toArray();
  res.json(dinos);
});

server.post("/dinos", async (req, res) => {
  const dinosaur = {
    name: req.body.name,
    type: req.body.type,
    vegan: req.body.vegan,
  };

  await databaseClient.connect();
  const db = databaseClient.db("flaky-dinosaurs");

  //Sammlung aller Dokumente
  const collection = db.collection("dinosaurs");
  // Füge ein neues Dokument ein, warte auf as Ergebnis
  const result = await collection.insertOne(dinosaur);
  // Ergebnis auswerten und ID an den Nutzer senden.
  res.json({
    message: "Successfully inserted a new dino with ID: " + result.insertedId,
  });
});

server.listen(4000, () => {
  console.log("Dino-Server is up and running");
});
