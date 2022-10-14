const express = require("express");
const rutasCarrito = require("./src/routes/cart.js");
const rutasProductos = require("./src/routes/products.js");

const app = express();
// Puerto con env o 8080
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", rutasProductos);
app.use("/api/cart", rutasCarrito);
// para error de rutas
app.all("*", (req, res) => {
  return res.status(404).send({
    Error: "La ruta no existe !!",
  });
});

// Listen
app.listen(PORT, () =>
  console.log(`Server de Primera entrega en Puerto ${PORT}`)
);
