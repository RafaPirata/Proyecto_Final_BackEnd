const { Router } = require("express");
const Funciones = require("../container/Funciones.js");
const Product = require("../class/products.js");

const rutasProductos = Router();
// contenedor de Json o archivo
const fileProd = new Funciones("products");

// ------- Para mostrar todos los productos------
rutasProductos.get("/", (req, res) => {
  res.json(fileProd.getAll());
});

//--------- para mostrar productos por Id---------
rutasProductos.get("/:id", (req, res) => {
  res.json(fileProd.getById(req.params.id));
});

// -----------Para cargar nuevos productos --------
rutasProductos.post("/", (req, res) => {
  let body = req.body;
  let product = new Product(
    body.nombre,
    body.descripcion,
    body.codigo,
    body.foto,
    body.precio,
    body.stock
  );
  res.json(fileProd.save(product));
});

// ----------Para actualizar datos del productos segun Id---
rutasProductos.put("/:id", (req, res) => {
  let { id } = req.params;
  let product = { ...req.body, id: parseInt(id) };
  res.json(fileProd.update(product));
});

//----------Para eliminar productos segun id ------
rutasProductos.delete("/:id", (req, res) => {
  let { id } = req.params;
  res.json(fileProd.deleteById(id));
});

module.exports = rutasProductos;
