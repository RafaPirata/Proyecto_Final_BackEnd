// llamo al contenedor
const MongoDBContainer = require("../../container/MongoDBContainer");
// llamo al model de productos
const { productModel } = require("../../class/products");
// le asigno al container la extension en DAO
class ProductDaoMongoDB extends MongoDBContainer {
  constructor() {
    // le asigno el molde
    super(productModel);
  }
 // async disconnect() {}
}

module.exports = ProductDaoMongoDB;
