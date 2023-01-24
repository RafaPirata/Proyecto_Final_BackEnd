const { Router } = require("express");
const rutasCarrito = Router();

//-------------------Archivo-----------------------------------------------------------
// const Archivo = require("../container/contenedorArchivo.js");
// const Cart = require("../class/cart.js");
// const fileCarrito = new Archivo("cart");
// const fileProdCarr = new Archivo("products");

// --------------------Firebase--------------------------------------------------------

// const CartDaoFirebase = require("../daos/cart/CartDaoFirebase");
// const cartDao = new CartDaoFirebase();
// const { ProductosDaoFirebase } = require("../daos/products/prodDaosFirebase");
// const prodCartDaos = new ProductosDaoFirebase();
// --------------------Firebase--------------------------------------------------------
const CartDaoMondoDb = require("../daos/cart/CartDaoMongoDB");
const cartDao = new CartDaoMondoDb();
const ProductosDaoMongoDb = require("../daos/products/ProductosDaoMongoDb");
const prodCartDaos = new ProductosDaoMongoDb();

//-------------------------------MongooAtlas--------------------------------------------

// ---crear nuevo carrito------- ok
rutasCarrito.post("/fire", async (req, res) => {
  let cart = await cartDao.save();
  res.json({ status: "OK!", cart });
});
// --- cargar productos al id del carrito----- ok
rutasCarrito.post("/fire/:id/products", async (req, res) => {
  // ok funcionando
  try {
    const carritos = await cartDao.getById(req.params.id);
    if (!carritos) {
      return res.status(404).json({ msg: "Carrito no encontrado" });
    }
    console.log(carritos);
    console.log(req.body.id);
    const producto = await prodCartDaos.getById(req.body.id);
    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }
    console.log(producto);
    // carritos.push(producto);
    let newProd = await cartDao.updateCart(req.params.id, producto);
    res.status(200).json({
      msg: "Producto agregado al carrito",
      status: "OK!",
      cart: newProd,
    });
  } catch (error) {
    res.status(400).json({ msg: `Error ${error}` });
  }
});
// mostrar los carritos por id, ok funcionando
rutasCarrito.get("/fire/:id/products", async (req, res) => {
  let { id } = req.params;
  let cart = await cartDao.getById(id);
  if (cart.productos !== undefined) {
    res.json({ response: "No hay productos en carrito" });
  } else {
    res.json({ id: cart });
  }
});
// -- mostrar todos los carritos
rutasCarrito.get("/fire", async (req, res) => {
  // ok funcionando
  let cart = await cartDao.getAllCarts();
  res.json({ cart: cart });
});
// --- eliminar carrito segun id ----- ok funcionando
rutasCarrito.delete("/fire/:id", async (req, res) => {
  let { id } = req.params;
  let deleted = await cartDao.delete(id);
  res.json({ status: "OK!", deleted });
});
// ---- Eliminar productos del id del carrito segun id de producto
rutasCarrito.delete("/fire/:id/products/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;
  let respuesta = cartDao.deleteCartById(id, id_prod);

  res.json(JSON.stringify(respuesta));
});

///-------------------------------------------- archivo-------------------------------------------------------

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
