const contenedorMongoDB = require("../contenedores/ContenedorMongoDB");
const userModel = require("../models/user");

class UserDaoMongoDB extends contenedorMongoDB {
  constructor() {
    super(
      process.env.MONGO_PATH,
      userModel
    );
  }
}

module.exports = UserDaoMongoDB;
