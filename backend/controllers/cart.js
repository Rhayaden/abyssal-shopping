const Product = require("../models/product");
const User = require("../models/user");

exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    const cart = user.cart;

    res.status(200).json({
      message: "Fetched posts successfully.",
      cart: cart,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postCart = async (req, res, next) => {
  const cart = req.body.map((i) => {
    return {
      _id: i._id,
      title: i.title,
      image: i.image,
      price: i.price,
      stock: i.stock,
      quantity: i.quantity,
    };
  });
  const cartPrices = req.body.map((i) => i.price * i.quantity);
  const cartTotal = cartPrices.reduce((a, b) => a + b);

  try {
    await User.findByIdAndUpdate(req.userId, {
      cart: {
        cartProducts: cart,
        total: cartTotal,
      },
    });

    res.status(200).json({
      successMessage: "Cart updated successfully!",
      cart: cart,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteFromCart = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    await Product.findByIdAndRemove(prodId);

    const user = await User.findById(req.userId);

    const price = req.body.price;
    const quantity = req.body.quantity;
    user.cart.total = user.cart.total - price * quantity;
    user.cart.cartProducts.pull(prodId);
    await user.save();
    res.status(200).json({ message: "product deleted from cart" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    user.cart.cartProducts = [];
    user.cart.total = 0;
    await user.save();
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
