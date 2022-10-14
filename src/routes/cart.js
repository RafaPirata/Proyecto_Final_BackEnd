const { Router } = require("express");
const Funciones = require("../container/Funciones.js");
const Cart = require("../class/cart.js");

const rutasCarrito = Router();
const fileCarrito = new Funciones("cart");
const fileProdCarr = new Funciones("products");

// --------- para agregar un nuevo carrito---------
rutasCarrito.post("/", (req, res) => {
  let cart = new Cart();
  res.json(fileCarrito.save(cart));
});

//------------para agregar productos al carrito por Id---
rutasCarrito.post("/:id/products", (req, res) => {
  let { id } = req.params;
  let cart = fileCarrito.getById(id);
  let body = req.body.id_prod;

  let products = body.forEach((id_prod) => {
    let prod = fileProdCarr.getById(id_prod);
    cart.products.push(prod);
  });

  let response = fileCarrito.update(cart);
  res.json({ response: "Se agrego productos en el carrito", cart: response });
});

// --------- Para eliminar carrito-------------------
rutasCarrito.delete("/:id", (req, res) => {
  let { id } = req.params;
  res.json(fileCarrito.deleteById(id));
});

// --------- Para eliminar productos del carrito-------------------
rutasCarrito.delete("/:id/products/:id_prod", (req, res) => {
  let { id, id_prod } = req.params;
  let cart = fileCarrito.getById(id);

  let index = cart.products.findIndex((el, ind) => {
    if (el.id == id_prod) {
      return true;
    }
  });

  let newProducts = cart.products.filter((prod, ind) => prod.id != id_prod);
  cart.products = newProducts;
  let response = fileCarrito.update(cart);
  res.json({ response: "Se elimino producto del carrito", cart: response });
});

// --------- Para mostrar carrito por Id-------------------
rutasCarrito.get("/:id/products", (req, res) => {
  let { id } = req.params;
  let cart = fileCarrito.getById(id);
  if (cart.products == undefined) {
    res.json({ response: "No hay productos en carrito" });
  } else {
    res.json({ id: cart.id, products: cart.products });
  }
});
// -------------Para mostrar todos los carritos---------
rutasCarrito.get("/products", (req, res) => {
  res.json(fileCarrito.getAll());
});

module.exports = rutasCarrito;
