const ContenedorMongo = require("../../container/contenedorMongo");

class ProductosDaoMongoDb extends ContenedorMongo {
  constructor() {
    super("productos", {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true },
    });
  }
}

module.exports = ProductosDaoMongoDb;
