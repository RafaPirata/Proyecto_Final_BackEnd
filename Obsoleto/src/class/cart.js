const mongoose = require("mongoose");
const { ProductIDSchema } = require("./products");

const cartCollection = "carts";

const CartSchema = new mongoose.Schema(
  {
    products: [ProductIDSchema],
  },
  { timestamps: true }
);

const cartModel = mongoose.model(cartCollection, CartSchema);

class Cart {
  constructor(products) {
    this.timestamp = new Date().toLocaleString();
    this.products = products || [];
  }
}

module.exports = Cart;

module.exports = { Cart, cartModel };
