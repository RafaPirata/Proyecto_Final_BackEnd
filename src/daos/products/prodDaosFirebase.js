const ContenedorFirebase = require("../../container/contenedorFirebase");
// const productos = require("../../class/products");

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }
}

module.exports = { ProductosDaoFirebase };
