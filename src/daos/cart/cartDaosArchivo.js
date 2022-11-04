const Archivo = require("../../container/contenedorArchivo");

class cartDaosArchivo extends Archivo {
  constructor() {
    super("db/cart.json");
  }

  async guardar(carrito = { productos: [] }) {
    return await super.guardar(carrito);
  }
}
module.exports = cartDaosArchivo;
