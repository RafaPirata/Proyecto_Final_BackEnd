const DataBaseKnexContainer = require("../../container/DataBaseKnexContainer");

class ProductDaoKnex extends DataBaseKnexContainer {
  constructor(knex) {
    super(knex, "productos");
  }
  async disconnect() {}
}

module.exports = ProductDaoKnex;
