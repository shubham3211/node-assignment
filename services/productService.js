const { Product } = require("../models");

const createProduct = async (productBody) => {
  const product = await Product.create(productBody);
  return product;
};

const deleteProduct = async (productId) => {
  const product = await Product.deleteOne({ _id: productId });
  return product;
};

const updateProduct = async (productBody) => {
  const { _id, ...productInfo } = productBody;
  const product = await Product.findByIdAndUpdate(_id, productInfo);
  return product;
};

const getAllProducts = async () => await Product.find({});

const getProductById = async (productId) => await Product.findById(productId);

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
};
