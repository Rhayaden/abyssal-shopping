const mongoose = require("mongoose");

const User = require("../models/user");
const Product = require("../models/product");

exports.getOrder = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  try {
    const user = await User.findById(req.userId);

    const userOrders = user.orders;

    const orders = await User.findById(req.userId).select({
      orders: {
        $slice: [(currentPage - 1) * perPage, perPage],
      },
    });

    res.status(200).json({
      message: "Fetched orders successfully.",
      orders: orders.orders,
      totalItems: userOrders.length,
      perPage: perPage,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postOrder = async (req, res, next) => {
  const orderProducts = req.body.items;
  const orderTotal = req.body.totalPrice;

  const createDate = new Date();
  const day = createDate.toLocaleString("default", { day: "2-digit" });
  const month = createDate.toLocaleString("en-US", {
    month: "long",
  });
  const year = createDate.getFullYear();

  const order = {
    _id: new mongoose.Types.ObjectId(),
    items: orderProducts,
    total: orderTotal,
    createdAt: month + " " + day + ", " + year,
  };

  try {
    const product = await Product.find({
      _id: { $in: orderProducts },
    });

    const prodStock = product.map((i) => i.stock);

    const prodQty = orderProducts.map((i) => i.quantity);

    const newStock = prodStock.map((e, i) => e - prodQty[i]);

    const updatedStock = product.map((e, i) => {
      product[i].stock = newStock[i];
      return { ...product };
    });
    product == updatedStock;

    product.map(async (e, i) => {
      await Product.replaceOne(
        { _id: e._id },
        {
          title: product[i].title,
          image: product[i].image,
          description: product[i].description,
          price: product[i].price,
          stock: newStock[i],
          addedBy: product[i].addedBy,
          addedByUser: product[i].addedByUser,
        }
      );
    });

    const user = await User.findById(req.userId);
    if (orderProducts) {
      user.orders.push(order);
    }
    await user.save();
    res.json({
      successMessage: "Order sent successfully!",
      order: order,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
