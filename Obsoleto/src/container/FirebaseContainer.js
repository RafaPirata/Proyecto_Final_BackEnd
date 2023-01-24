const admin = require("firebase-admin");
const { OK } = require("sqlite3");
const { optionsFirebase } = require("../utils/configBases");
admin.initializeApp({
  credential: admin.credential.cert(optionsFirebase),
});

class FirebaseContainer {
  constructor(collection) {
    this.db = admin.firestore();
    this.query = this.db.collection(collection);
    console.log(`Base conectada !!!! con la collection ${collection}`);
  }

  save = async (element) => {
    let ret = {};
    try {
      const newElement = await this.query.add(
        JSON.parse(JSON.stringify(element))
      );
      ret = newElement.id;
      console.log(
        `"OK" Se guardo en ${this.query._queryOptions.collectionId} ID: ${ret}`
      );
    } catch (err) {
      console.error(err);
      ret = {
        error: 1,
        description: `"ERROR" no se guardo en: ${this.query._queryOptions.collectionId}: ${err}`,
      };
      throw err;
    }
    return ret;
  };

  getAll = async () => {
    let ret = [];
    try {
      const snapshot = await this.query.get();
      let elements = snapshot.docs;
      ret = elements.map((elem) => ({ id: elem.id, ...elem.data() }));
    } catch (err) {
      console.error(err);
      throw err;
    }
    return ret;
  };

  getById = async (id) => {
    let ret = {
      error: 2,
      description: `El id: ${id} en ${this.query._queryOptions.collectionId} No existe !!`,
    };
    try {
      const elem = this.query.doc(`${id}`);
      const snapshot = await elem.get();
      if (snapshot.exists) ret = { id: snapshot.id, ...snapshot.data() };
    } catch (err) {
      console.error(err);
      throw err;
    }
    return ret;
  };

  update = async (id, element) => {
    let ret = {
      error: 2,
      description: `El id: ${id} en ${this.query._queryOptions.collectionId} No existe !!`,
    };
    try {
      const elemById = this.query.doc(`${id}`);
      await elemById.update(element);
      console.log(
        `"OK" Se actualizo el id: ${id} en ${this.query._queryOptions.collectionId}`
      );
      ret = {
        error: 0,
        description: `Se actualizo el id: ${id} en ${this.query._queryOptions.collectionId} Correctamente !!`,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
    return ret;
  };

  deleteById = async (id) => {
    let ret = {
      error: 2,
      description: `El id: ${id} en ${this.query._queryOptions.collectionId} No existe !!`,
    };
    try {
      await this.query.doc(`${id}`).delete();
      console.log(
        `[OK] delete ID ${id} on ${this.query._queryOptions.collectionId}`
      );
      ret = {
        error: 0,
        description: `Eliminado el id: ${id} en ${this.query._queryOptions.collectionId} Correctamente !!`,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
    return ret;
  };

  deleteAll = async () => {
    // Ojo !! elimina todo
    let ret = {
      error: 0,
      description: `Se elimino todo en: ${this.query._queryOptions.collectionId} Correctamente !!`,
    };
    try {
      const batch = this.db.batch();
      const snapshot = await this.query.get();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log(
        `"OK" Eliminado todo en ${this.query._queryOptions.collectionId}`
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
    return ret;
  };
}

module.exports = FirebaseContainer;
