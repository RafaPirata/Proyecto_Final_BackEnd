// Server
const express = require("express");

// router
const prodRouter = require("./src/routes/product");
const cartRouter = require("./src/routes/cart");

const app = express();
// Puerto con env o 8080
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", prodRouter);
app.use("/api/cart", cartRouter);
// para error de rutas
app.all("*", (req, res) => {
  return res.status(404).send({
    Error: "La ruta no existe !!",
  });
});

app.listen(PORT, () =>
  console.log(`Server de Segunda entrega en Puerto ${PORT}`)
);
