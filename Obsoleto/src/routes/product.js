const { Router } = require("express");
const productRouter = Router();

const { catalog } = require("./config");
const { Product } = require("../class/products");


// crear nuevos productos
productRouter.post("/", async (req, res) => {
  const data = req.body;
  const prod = new Product(
    data.nombre,
    data.descripcion,
    data.codigo,
    data.foto,
    data.precio,
    data.stock
  );
  res.json(await catalog.save(prod));
});
productRouter.get("/", async (req, res) => {
  
   res.json(await catalog.getAll());
});
//Buscar productos segun el id
productRouter.get("/:id", async (req, res) => {
  if (req.params.id) res.json(await catalog.getById(req.params.id));
  else res.json(await catalog.getAll());
});

// actualizar los productos segun id
productRouter.put("/:id", async (req, res) => {
  res.json(await catalog.update(req.params.id, req.body));
});

// eliminar productos segun id
productRouter.delete("/:id", async (req, res) => {
  res.json(await catalog.deleteById(req.params.id));
});
// eliminar todos los productos
productRouter.delete("/", async (req, res) => {
  res.json(await catalog.deleteAll());
});

module.exports = productRouter;
