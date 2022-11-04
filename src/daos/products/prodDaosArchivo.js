const Archivo = require("../../container/contenedorArchivo");

class prodDaosArchivo extends Archivo {
  constructor() {
    super("db/products.json");
  }

  async desconectar() {}
}

module.exports = prodDaosArchivo;
