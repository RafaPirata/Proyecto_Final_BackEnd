//daos
let cart = undefined;
let knex = undefined;
let catalog = undefined;

//database knex
const ProductDaoKnex = require("../daos/products/ProductDaoKnex");

//connector
const connector = process.env.CONNECTOR || "firebase";
switch (connector) {
  case "firebase":
    const CartDaoFirebase = require("../daos/cart/CartDaoFirebase");
    cart = new CartDaoFirebase();
    const ProductDaoFirebase = require("../daos/products/prodDaosFirebase.js");
    catalog = new ProductDaoFirebase();
    console.log("En Firebase");
    break;
  case "mongodb":
    const mongoose = await require("mongoose");
    const { mongodb } = await require("../utils/configBases");
    mongoose.connect(mongodb.url, mongodb.option);

    const CartDaoMongoDB = require("../daos/cart/CartDaoMongoDB");
    cart = new CartDaoMongoDB();
    const ProductDaoMongoDB = require("../daos/products/ProductosDaoMongoDb");
    catalog = new ProductDaoMongoDB();
    console.log("En Mongo");
    break;
  case "mysql":
    const { optionsMariaDB } = require("../utils/configBases");
    knex = require("knex")(optionsMariaDB);
    catalog = new ProductDaoKnex(knex);
    console.log("En Mysql");
    break;
  case "sqlite3":
    const { optionsSqlite } = require("../utils/configBases");
    knex = require("knex")(optionsSqlite);
    catalog = new ProductDaoKnex(knex);
    console.log("En sqlite3");
    break;
}

module.exports = { catalog, cart };

/*---------------------------*/
/*   mysql/sqlite3 options   */
/*---------------------------*/
//const { createTableProducts } = require('../persistence/config/create')

/* create tables and insert test data */
const createFromScratch = async () => {
  await createTableProducts(mysqlKnex, tables.mysql);
};
//createFromScratch();
