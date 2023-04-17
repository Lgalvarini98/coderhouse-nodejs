const contenedorMongoDB = require("../contenedores/ContenedorMongoDB");
const messagesModel = require("../models/messages");

class MsgDaoMongoDB extends contenedorMongoDB {
  constructor() {
    super(process.env.MONGO_PATH, messagesModel);
  }
}

module.exports = MsgDaoMongoDB;
