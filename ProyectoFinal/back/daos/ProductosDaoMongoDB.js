const contenedorMongoDB = require("../contenedores/ContenedorMongoDB");
const productoModel = require("../models/producto");

class ProductosDaoMongoDB extends contenedorMongoDB {
  constructor() {
    super(
      process.env.MONGO_PATH,
      productoModel
    );
  }
}

module.exports = ProductosDaoMongoDB;
