const contenedorMongoDB = require("../contenedores/ContenedorMongoDB");
const userModel = require("../models/user");

class UserDaoMongoDB extends contenedorMongoDB {
  constructor() {
    super(
      "mongodb+srv://coderhouse:E6xF3N7fU1g9krVI@cluster0.w6djkta.mongodb.net/?retryWrites=true&w=majority",
      userModel
    );
  }
}

module.exports = UserDaoMongoDB;
