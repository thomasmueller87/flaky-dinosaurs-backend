import Dino from '../models/dino.model.js';

const getDinos = async (req, res) => {
  const dinos = await Dino.find();
  res.json(dinos);
};

const getDino = async (req, res) => {
  const dinoId = req.params.dinoId;
  const dino = await Dino.findById(dinoId);
  res.json(dino);
};

const postDino = async (req, res) => {
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
};

const putDino = async (req, res) => {
  const dinoId = req.params.dinoId;
  const dino = req.body;
  //Dino suchen und updaten. Parameter: (ID, Dino, { Zeige den geänderten Satz an})
  const result = await Dino.findByIdAndUpdate(dinoId, dino, {
    returnDocument: 'after',
  });
  res.json(result);
};

const deleteDino = async (req, res) => {
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
};

export { getDinos, getDino, postDino, putDino, deleteDino };
