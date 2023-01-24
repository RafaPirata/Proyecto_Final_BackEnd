const mongoose = require("mongoose");
// asigno el nombre de la coleccion a crear
const productCollection = "productos";

const ProductIDSchema = new mongoose.Schema({
  id_prod: { type: String, require: true, maxLength: 32, trim: true },
});

const ProductSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, maxlength: 100 },
    descripcion: { type: String, required: true, maxlength: 200 },
    precio: { type: Number, required: true },
    foto: { type: String, required: false, maxlength: 250 },
    codigo: { type: String, required: true, maxlength: 8 },
    stock: { type: Number, min: 1 },
  },
  { timestamps: true }
);

const productModel = mongoose.model(productCollection, ProductSchema);

class Product {
  constructor(nombre, descripcion, codigo, foto, precio, stock) {
    this.timestamp = new Date().toLocaleString();
    this.nombre = nombre || "";
    this.descripcion = descripcion || "";
    this.codigo = codigo || "";
    this.foto = foto || "";
    this.precio = precio || "";
    this.stock = stock || "";
  }
}
module.exports = { Product, ProductSchema, ProductIDSchema, productModel };
