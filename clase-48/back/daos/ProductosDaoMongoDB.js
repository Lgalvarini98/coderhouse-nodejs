const contenedorMongoDB = require("../contenedores/ContenedorMongoDB");
const productoModel = require("../models/producto");

class ProductosDaoMongoDB extends contenedorMongoDB {
  constructor() {
    super(
      "mongodb+srv://coderhouse:E6xF3N7fU1g9krVI@cluster0.w6djkta.mongodb.net/?retryWrites=true&w=majority",
      productoModel
    );
  }
}

module.exports = ProductosDaoMongoDB;
