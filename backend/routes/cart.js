const express = require("express");

const isAuth = require("../middleware/is-auth");

const cartController = require("../controllers/cart");

const router = express.Router();

router.get("/", isAuth, cartController.getCart);
router.post("/", isAuth, cartController.postCart);
router.delete(
  "/delete-from-cart/:productId",
  isAuth,
  cartController.deleteFromCart
);
router.get("/clear-cart", isAuth, cartController.clearCart);

module.exports = router;
