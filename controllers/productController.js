const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const productService = require("../services/productService");

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send({
    product,
  });
});

const getProducts = catchAsync(async (req, res) => {
  const product = await productService.getAllProducts();
  res.status(httpStatus.CREATED).send({
    product,
  });
});

const getProductsById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.status(httpStatus.CREATED).send({
    product,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const product = await productService.deleteProduct(req.body._id);
  res.send({
    product,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProduct(req.body);
  res.send({
    product,
  });
});

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProductsById,
};
