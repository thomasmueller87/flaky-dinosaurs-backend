import Category from '../models/category.model.js';

const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

const getCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const category = await Category.findById(categoryId);
  res.json(category);
};

const postCategory = async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  try {
    const result = await category.save();
    // Ergebnis auswerten und ID an den Nutzer senden.
    res.json({
      message:
        'Successfully inserted a new Category with ID: ' +
        result._Id,
    });
  } catch (error) {
    res.json(error);
  }
};

const putCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const category = req.body;
  //Dino suchen und updaten. Parameter: (ID, Dino, { Zeige den geänderten Satz an})
  const result = await Category.findByIdAndUpdate(
    categoryId,
    category,
    {
      returnDocument: 'after',
    }
  );
  res.json(result);
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const result = await Category.findByIdAndDelete(categoryId);
    if (result) {
      res.json({
        success: true,
        status: 'Category successfully deleted',
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

export {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
};
