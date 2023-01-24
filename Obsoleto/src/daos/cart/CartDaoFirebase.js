const FirebaseContainer = require("../../container/FirebaseContainer");

class CartDaoFirebase extends FirebaseContainer {
  constructor() {
    super("carritos");
  }
  async disconnect() {}
}

module.exports = CartDaoFirebase;
