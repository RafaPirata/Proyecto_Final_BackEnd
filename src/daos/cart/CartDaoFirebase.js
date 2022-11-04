const ContenedorFirebase = require("../../container/contenedorFirebase");

class CartDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("carritos");
  }

  // async save(carrito = { products: [] }) {
  //   return super.save(carrito);
  // }
}

module.exports = CartDaoFirebase;
