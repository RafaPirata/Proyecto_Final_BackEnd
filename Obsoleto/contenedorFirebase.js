let admin = require("firebase-admin");
const { optionsFirebase } = require("../utils/configBases");

admin.initializeApp({
  credential: admin.credential.cert(optionsFirebase),
});

const db = admin.firestore();

class ContainerFirestore {
  constructor(collection) {
    this.collection = db.collection(collection);
    console.log(`Base conectada con la collection ${collection}`);
  }
  async deleteCartById(id) {
    try {
      //let id = '2'
      const queryCarritos = this.collection.doc(`${id}`);
      const item = await queryCarritos.delete();
      console.log("El Carrito ha sido eliminado", item);
      return item;
    } catch (error) {
      console.error("Error FB DeleteCart: ", error);
    }
  }

  async save(document) {
    // Ok funcionando
    let doc = this.collection.doc();
    let item = await doc.create(document);
    return item;
  }
  async saveCart() {
    // Ok funcionando

    let doc = this.collection.doc(id);
    let item = await doc.create({ productos: [] });
    return item;
  }
  async getAllCarts() {
    // ok funcionando
    try {
      const queryCarritos = await this.collection.get();
      const response = queryCarritos.docs.map((res) => ({
        id: res.id,
        ...res.data(),
      }));
      console.log("Carritos: ", response);
      return response;
    } catch (error) {
      console.error("Error FB getCarts: ", error);
    }
  }

  async getAll() {
    let result = await this.collection.get();
    result = result.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return result;
  }
  async buscarEnProd(id) {
    const producto = await this.collection.get(id);

    return producto.id;
  }

  async getById(id) {
    let result = await this.collection.get();
    result = result.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    let item = result.find((elem) => elem.id == id);
    return item;
  }

  async delete(id) {
    let doc = this.collection.doc(`${id}`);
    let item = doc.delete();
    return { status: "Deleted" };
  }

  async update(content, id) {
    let doc = this.collection.doc(`${id}`);
    let item = await doc.update(content);
    return item;
  }
  async updateCart(id, products) {
    // ok funcionando
    try {
      const queryCarrito = this.collection.doc(id);
      const item = await queryCarrito.get();
      const respuesta = item.data();
      const itemInsert = await queryCarrito.update({ respuesta, ...products });
      console.log("El Carrito ha sido actualizado", itemInsert);
      return itemInsert;
    } catch (error) {
      console.error("Error FB updateProduct: ", error);
    }
  }
}

module.exports = ContainerFirestore;
