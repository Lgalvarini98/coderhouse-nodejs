const express = require("express");
const UserDaoMongoDB = require("../daos/UsersDaoMongoDB");

class AuthController {
  constructor() {
    this.authRouter = express.Router();
    this.userDaoMongoDB = new UserDaoMongoDB();

    this.authRouter.post("/login", (req, res) => {
      this.userDaoMongoDB
        .login(req.body)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    this.authRouter.post("/register", (req, res) => {
      this.userDaoMongoDB
        .register(req.body)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });
  }

  getRouter() {
    return this.authRouter;
  }
}

module.exports = AuthController;
