import Product from '../models/product.model.js';

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getProduct = async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  res.json(product);
};

const postProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    isVegan: req.body.isVegan,
    tags: req.body.tags,
    packageSize: req.body.packageSize,
    email: req.body.email,
  });
  try {
    const result = await product.save();
    // Ergebnis auswerten und ID an den Nutzer senden.
    console.log(result._id);
    res.json({
      message:
        'Successfully inserted a new product with ID: ' +
        result._id,
    });
  } catch (error) {
    res.json(error);
  }
};

const putProduct = async (req, res) => {
  const productId = req.params.productId;
  const product = req.body;
  //Dino suchen und updaten. Parameter: (ID, Dino, { Zeige den geänderten Satz an})
  const result = await Product.findByIdAndUpdate(
    productId,
    product,
    {
      returnDocument: 'after',
    }
  );
  res.json(result);
};

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const result = await Product.findByIdAndDelete(productId);
    if (result) {
      res.json({
        success: true,
        status: 'Product successfully deleted',
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
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
};
