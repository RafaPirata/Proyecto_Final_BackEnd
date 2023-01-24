const MongoDBContainer = require("../../container/MongoDBContainer");
const { cartModel } = require("../../class/cart");

class CartDaoMongoDB extends MongoDBContainer {
  constructor() {
    super(cartModel);
  }
  async disconnect() {}
}

module.exports = CartDaoMongoDB;
