const express = require("express");

const { productValidation } = require("../util/validation");

const isAuth = require("../middleware/is-auth");

const productController = require("../controllers/product");

const router = express.Router();

router.get("/all-products", productController.getAllProducts);

router.get("/products", productController.getProducts);

router.get("/my-products", isAuth, productController.getMyProducts);

router.get("/products/:productId", productController.getProductDetail);

router.post(
  "/add-product",
  isAuth,
  productValidation,
  productController.addProduct
);
router.put(
  "/edit-product/:productId",
  isAuth,
  productValidation,
  productController.editProduct
);

router.delete(
  "/delete-product/:productId",
  isAuth,
  productValidation,
  productController.deleteProduct
);

module.exports = router;
