const MemoryContainer = require("../../container/MemoryContainer");

class ProductDaoMemory extends MemoryContainer {
  constructor() {
    super();
  }
  async disconnect() {}
}

module.exports = ProductDaoMemory;
