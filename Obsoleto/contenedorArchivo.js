const fs = require("fs");

module.exports = class Archivo {
  constructor(name) {
    this.name = `${__dirname}/db/${name}.json`;

    try {
      this.elements = fs.readFileSync(this.name, "utf-8");
      this.elements = JSON.parse(this.elements);
    } catch (error) {
      this.elements = [];
    }
  }
  // Para mostrar todos los elemnetos
  getAll() {
    return this.elements;
  }
  // Mostrar por ID
  getById(id) {
    try {
      let element = { id };
      for (let i = 0; i < this.elements.length; i++) {
        if (element.id == this.elements[i].id) {
          element = this.elements[i];
        }
      }

      return element;
    } catch (error) {
      return error;
    }
  }
  // Guardar
  save(element) {
    try {
      if (this.elements.length == 0) {
        element.id = 1;
      } else {
        element.id = this.elements.length + 1;
      }
      this.elements.push(element);
      fs.promises
        .writeFile(this.name, JSON.stringify(this.elements, null, "\t"))
        .then(() => console.log("Guardado !!"))
        .catch((e) => console.log(e));

      return { response: "Guardado en base", element };
    } catch (error) {
      console.log(error);
      return { response: "Error!", error };
    }
  }
  // actualizar
  update(element) {
    try {
      let one = this.elements.find((el) => el.id == element.id);
      // console.log(one)
      let newElement = { ...one, ...element };

      let index = this.elements.findIndex((el, ind) => {
        if (el.id == newElement.id) {
          return true;
        }
      });
      this.elements[index] = newElement;

      fs.promises
        .writeFile(this.name, JSON.stringify(this.elements, null, "\t"))
        .then(() => console.log("Elemnto actualizado !!"))
        .catch((e) => console.log(e));

      return { response: "Elemnto actualizado !!", element: newElement };
    } catch (error) {
      console.log(error);
      return { response: "Error!", error };
    }
  }
  //Eliminar todo
  delete() {
    fs.truncateSync(this.name, 0, () =>
      console.log("datos del archivo eliminado!!")
    );
    return { response: "Se elimino todo de la base!!" };
  }
  // Eliminar por Id
  deleteById(id) {
    try {
      let index = this.elements.findIndex((el, ind) => {
        if (el.id == id) {
          return true;
        }
      });
      let element = this.elements.splice(index, 1);

      fs.promises
        .writeFile(this.name, JSON.stringify(this.elements, null, "\t"))
        .then((e) => console.log(`El elemento con ${id} fue eliminado !!`))
        .catch((e) => console.log(`Error ${e}`));

      return { response: "Eliminado !!", element };
    } catch (error) {
      console.log(error);
      return "El Id no existe !!";
    }
  }
};
