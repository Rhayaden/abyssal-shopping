const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");

const Product = require("../models/product");
const User = require("../models/user");

const perPage = 10;

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      message: "All products fetched successfully.",
      products: products,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  const currentPage = req.query.page || 1;

  try {
    const totalItems = await Product.find().countDocuments();

    const products = await Product.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Page products fetched successfully.",
      products: products,
      totalItems: totalItems,
      perPage: perPage,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getMyProducts = async (req, res, next) => {
  const currentPage = req.query.page || 1;

  try {
    const totalItems = await Product.find({
      addedBy: req.userId,
    }).countDocuments();
    const myProducts = await Product.find({ addedBy: req.userId })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "User products fetched successfully.",
      myProducts: myProducts,
      totalItems: totalItems,
      perPage: perPage,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProductDetail = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findById(prodId);

    res.status(200).json({
      message: "Product detail fetched successfully.",
      product: product,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.array();
    const errorMessages = errorArray.map((err) => err.msg);
    res.status(422).json({ message: errorMessages });
    return;
  }

  const title = req.body.title;
  const image = req.file.path;
  const description = req.body.description;
  const price = req.body.price;
  const stock = req.body.stock;
  const addedByUser = req.body.addedByUser;
  const product = new Product({
    title: title,
    image: image,
    description: description,
    price: price,
    stock: stock,
    addedBy: req.userId,
    addedByUser: addedByUser,
  });

  try {
    await product.save();
    const user = await User.findById(req.userId);

    user.products.push(product);
    await user.save();

    res.status(201).json({
      successMessage: "Product created successfully!",
      product: product,
      addedBy: { _id: user._id, username: user.username },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.array();
    const errorMessages = errorArray.map((err) => err.msg);
    res.status(422).json({ message: errorMessages });
    return;
  }

  const title = req.body.title;
  const image = req.file.path;
  const description = req.body.description;
  const price = req.body.price;
  const stock = req.body.stock;

  try {
    const product = await Product.findById(prodId);

    clearImage(product.image);

    product.title = title;
    product.image = image;
    product.description = description;
    product.price = price;
    product.stock = stock;

    const result = await product.save();
    res.status(200).json({ product: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const deletedProduct = await Product.findById(prodId);

    clearImage(deletedProduct.image);

    await Product.findByIdAndRemove(prodId);

    const user = await User.findById(req.userId);

    user.products.pull(prodId);
    await user.save();
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
