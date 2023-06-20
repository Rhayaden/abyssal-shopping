const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  cart: {
    cartProducts: [
      {
        _id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  orders: [
    {
      type: Object,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
