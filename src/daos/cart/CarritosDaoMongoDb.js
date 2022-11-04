const ContenedorMongo = require("../../container/contenedorMongo.js");

class CarritosDaoMongoDb extends ContenedorMongo {
  constructor() {
    super("carritos", {
      productos: { type: [], required: true },
    });
  }

  async guardar(carrito = { productos: [] }) {
    return super.guardar(carrito);
  }
}

module.exports = CarritosDaoMongoDb;
