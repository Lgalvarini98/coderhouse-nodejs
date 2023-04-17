const MsgDaoMongoDB = require("../daos/MsgDaoMongoDB");
const msgDaoMongoDB = new MsgDaoMongoDB();

function getAllMessages(req, res) {
  msgDaoMongoDB
    .getAll()
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
}

const msgController = {
  getAllMessages,
};

module.exports = msgController;
