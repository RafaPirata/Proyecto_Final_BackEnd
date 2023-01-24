const { Router } = require("express");
const rutasProductos = Router();

//-----------------------------Firebase -------------------------
// const { ProductosDaoFirebase } = require("../daos/products/prodDaosFirebase");
// const prodDaos = new ProductosDaoFirebase();
//--------------------------Mongoo---------------------------

const ProductosDaoMongoDb = require("../daos/products/ProductosDaoMongoDb");
const fileProd = new ProductosDaoMongoDb();
//--------rutasProductos GET ALL ---------
rutasProductos.get("/", async (req, res) => {
  try {
    const productos = await fileProd.getAllProducts();

    if (productos !== {}) {
      res.status(200).json({ data: productos });
    } else {
      res.status(200).json({ Msg: "No products founded" });
    }
  } catch (error) {
    res.status(400).json({ msg: "No products availables" });
  }
});

//--------rutasProductos GET BY ID ---------
rutasProductos.get("/:id", async (req, res) => {
  const id = req.params.id;
  //console.log('id ', id)
  try {
    const productos = await fileProd.getById(id);
    //console.log('Producto: '+ productos)
    if (productos) {
      res.status(200).json({ data: productos });
    } else {
      res.status(200).json({ Msg: "No product founded with the ID given" });
    }
  } catch (error) {
    res.status(400).json({ msg: "No product available with the ID given" });
  }
});

//--------rutasProductos POST ---------

rutasProductos.post("/", async (req, res) => {
  const { body } = req;
  const response = fileProd.createPr(body);
  res
    .status(201)
    .json({ ...response })
    .end();
});

// rutasProductos.post("/", async (req, res) => {
//   console.log("Post: " + JSON.stringify(req.body, null, 2));
//   const today = new Date();
//   const timestamp = today.toLocaleString("en-GB");

//   const addProduct = {
//     timestamp: timestamp,
//     name: req.body.name,
//     description: req.body.description,
//     price: parseInt(req.body.price),
//     picture: req.body.picture,
//     code: req.body.code,
//     stock: parseInt(req.body.stock),
//   };
//   try {
//     await fileProd.createProduct(addProduct);
//     res.json(addProduct);
//   } catch (error) {
//     res.status(400).json({ msg: "Error! The product was not added!!" });
//   }
// });

//--------rutasProductos DELETE ---------
rutasProductos.delete("/:id", async (req, res) => {
  const id = req.params.id;
  //console.log('ID: ', id)
  try {
    const product = await fileProd.deleteProduct(id);
    if (product) {
      res.status(200).json({ data: "Product Deleted: ", product });
    } else {
      res
        .status(200)
        .json({ Msg: "No product founded to delete with the ID given" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Error! The product was not deleted!!" });
  }
});

//--------rutasProductos UPDATE BY ID ---------
rutasProductos.put("/:id", async (req, res) => {
  const today = new Date();
  const timestamp = today.toLocaleString();
  const { id } = req.params;
  const dataBody = req.body;

  try {
    const productUpdated = await fileProd.updateProduct(
      id,
      dataBody,
      timestamp
    );
    if (productUpdated !== null) {
      res.status(200).json({ data: "Product Updated: ", productUpdated });
    } else {
      res
        .status(200)
        .json({ Msg: "No product founded to update with the ID given" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Error! NO product was updated!!" });
  }
});

//-------------------------------------------------------------------------------------
// cargar productos Firebase
rutasProductos.post("/fire", async (req, res) => {
  let product = req.body;
  product = await prodDaos.save(product);
  res.json({ status: "Ok!", product });
});

// mostrar productos
rutasProductos.get("/fire", async (req, res) => {
  let products = await prodDaos.getAll();
  res.json({ products: products });
});
// mostrar por id
rutasProductos.get("/fire/:id", async (req, res) => {
  let product = await prodDaos.getById(req.params.id);
  res.json({ product });
});
// Eliminar por id
rutasProductos.delete("/fire/:id", async (req, res) => {
  let { id } = req.params;
  product = await prodDaos.delete(id);
  res.json({ status: "OK!", response: product });
});
// Actualñizar por id
rutasProductos.put("/:id", async (req, res) => {
  let product = req.body;
  let response = await prodDaos.update(req.params.id, product);
  res.json({ status: "OK!", response });
});

//--------------------- contenedor de Json o archivo----------------------
// const Archivo = require("../container/contenedorArchivo.js");
// const Product = require("../class/products.js");
const { Db } = require("mongodb");
// const fileProd = new Archivo("productos");

// ------- Para mostrar todos los productos------
rutasProductos.post("/", (req, res) => {
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
