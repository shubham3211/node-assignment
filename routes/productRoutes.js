const express = require("express");
const router = express.Router();
const { productValidation } = require("../validations");
const validate = require("../middlewares/validate");
const { productController } = require("../controllers");
const { validateJwt } = require("../middlewares/validateJwt");
const { validatePermissions } = require("../middlewares/permissions");

router.post(
  "/add",
  validate(productValidation.create),
  validateJwt,
  validatePermissions("admin"),
  productController.createProduct
);
router.put(
  "/update",
  validate(productValidation.update),
  validateJwt,
  validatePermissions("admin"),
  productController.updateProduct
);
router.delete(
  "/delete",
  validate(productValidation.deleteProduct),
  validateJwt,
  validatePermissions("admin"),
  productController.deleteProduct
);

router.get("/all-products", validateJwt, productController.getProducts);
router.get(
  "/product-by-id/:id",
  validateJwt,
  productController.getProductsById
);

module.exports = router;
