const MemoryContainer = require("../../container/MemoryContainer");

class CartDaoMemory extends MemoryContainer {
  constructor() {
    super();
  }
  async disconnect() {}
}

module.exports = CartDaoMemory;
