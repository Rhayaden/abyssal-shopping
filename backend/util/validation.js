const { body } = require("express-validator");

const User = require("../models/user");
const Product = require("../models/product");

exports.authValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage("Your username must be between 3-12 characters")
    .custom((value, { req }) => {
      return User.findOne({ username: value }).then((user) => {
        if (user) {
          return Promise.reject("This username already taken");
        }
      });
    })
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value.includes(" ")) {
        return false;
      }
      return true;
    })
    .withMessage("No spaces are allowed in the username"),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("This e-mail address already exists");
        }
      });
    })
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Your password must be atleast 8 characters")
    .isLength({ max: 36 })
    .withMessage("Your password can be up to 36 characters"),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return;
      }
      return true;
    })
    .withMessage("The passwords you entered did not match"),
];

exports.productValidation = [
  body("title")
    .isString()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Product title must be atleast 3 characters")
    .isLength({ max: 50 })
    .withMessage("Product title can be up to 50 characters")
    .trim(),
  body("image")
    .custom((value, { req }) => {
      if (!req.file) {
        return;
      }
      return true;
    })
    .withMessage("Please upload an image"),
  body("description")
    .isLength({ min: 6 })
    .withMessage("Product description must be atleast 6 characters")
    .isLength({ max: 288 })
    .withMessage("Product description can be up to 288 characters")
    .notEmpty(),
  body("price")
    .isFloat({ min: 1 })
    .withMessage("You cannot sell products under 1 dollar")
    .notEmpty(),
  body("stock")
    .isInt({ allow_decimal: false })
    .withMessage("Decimal number cannot be used for stock number")
    .isFloat({
      min: 1,
      max: 1000,
    })
    .withMessage("Minimum 1, maximum 1000 products can be added")
    .notEmpty(),
];
