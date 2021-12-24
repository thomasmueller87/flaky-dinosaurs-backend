import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  isVegan: Boolean,
  tags: [String],
  packageSize: String,
  email: String,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
