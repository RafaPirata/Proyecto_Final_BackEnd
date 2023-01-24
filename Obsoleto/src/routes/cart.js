const { Router } = require("express");
const cartRouter = Router();

const { cart } = require("./config");
const { Cart } = require("../class/cart");

// crear un nuevo carrito, products[]
cartRouter.post("/", async (req, res) => {
  const data = req.body;
  const newCart = new Cart(data.products);
  res.json(await cart.save(newCart));
});
// cargar productos al carrito, segun id "carrito" y id_prod:·asdrsbgep"
cartRouter.post("/:id/products", async (req, res) => {
  const idCart = req.params.id;
  const prod = req.body.id_prod;
  const actualCart = await cart.getById(idCart);
  if (actualCart.error) res.json(actualCart);
  else {
    actualCart.products.push(prod);
    res.json(await cart.update(idCart, actualCart));
  }
});
// buscar el id de carrito
cartRouter.get("/:id/products", async (req, res) => {
  const elem = await cart.getById(req.params.id);
  res.json(elem);
});

// Eliminar por id el carrito
cartRouter.delete("/:id", async (req, res) => {
  res.json(await cart.deleteById(req.params.id));
});
// eliminar segun id de carrito el producto con id:prod

cartRouter.delete("/:id/products/:id_prod", async (req, res) => {
  const idCart = req.params.id;
  const actualCart = await cart.getById(idCart);
  if (actualCart.error) res.json(actualCart);
  else {
    const idProd = req.params.id_prod;
    console.log(idProd);
    if (
      actualCart.products.find(
        (elem) => elem === idProd || elem._id.toString() === idProd
      )
    ) {
      actualCart.products = actualCart.products.filter(
        (elem) => elem !== idProd && elem._id.toString() !== idProd
      );
      res.json(await cart.update(idCart, actualCart));
    } else
      res.json({ error: 2, description: `Element ID ${idProd} Not Found` });
  }
});

module.exports = cartRouter;
