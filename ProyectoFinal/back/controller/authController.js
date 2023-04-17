const UserDaoMongoDB = require("../daos/UsersDaoMongoDB");
const userDaoMongoDB = new UserDaoMongoDB();

function loginHandler(req, res) {
  userDaoMongoDB
    .login(req.body)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
}

function registerHandler(req, res) {
  userDaoMongoDB
    .register(req.body)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
}

module.exports = { loginHandler, registerHandler };
