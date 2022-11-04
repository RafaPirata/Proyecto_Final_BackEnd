const { mongodb } = require("../utils/configBases");
const mongoose = require("mongoose");
const Productos = require("../class/clase-produMongose");

class ContainerMongo {
  constructor() {
    mongoose.connect(
      mongodb,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log("Conectado a Mongoose")
    );

    // this.model = model;
  }
  async createProduct(product) {
    try {
      const newProduct = new Productos(product);
      await newProduct.save();
      console.log("Product created: ", newProduct);
    } catch (error) {
      console.log("Error MongoDB createProduct: ", error);
    }
  }

  async getAllProducts() {
    try {
      const products = await Productos.find();
      console.log("Productos encontrados: ", products);
      return products;
    } catch (error) {
      console.log("Error MongoDB getProducts: ", error);
    }
  }

  async getById(id) {
    try {
      const product = await Productos.findById(`${id}`);
      console.log("Producto encontrado: ", product);
      return product;
    } catch (error) {
      console.log("Error MongoDB getOneProducts: ", error);
    }
  }

  async updateProduct(id, dataBody, timestamp) {
    try {
      const newValues = {
        $set: dataBody,
        timestamp: timestamp,
      };
      const product = await Productos.updateOne({ _id: id }, newValues);
      console.log("Producto actualizado ", product);
      return product;
    } catch (error) {
      console.log("Error MongoDB updateProduct: ", error);
    }
  }

  async emptyCart(id) {
    try {
      const productDeleted = await Productos.deleteOne({ _id: `${id}` }); //{name: 'Peter'}
      console.log(
        "Producto eliminado: " + JSON.stringify(productDeleted, null, 2)
      );
      return productDeleted;
    } catch (error) {
      console.log("Error MongoDB deleteProduct: ", error);
    }
  }

  async desconectar() {}
}
module.exports = ContainerMongo;
