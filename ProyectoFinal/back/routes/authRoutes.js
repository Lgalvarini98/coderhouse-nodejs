const express = require("express");
const { loginHandler, registerHandler } = require("../controller/authController");

const authRouter = express.Router();

authRouter.post("/login", loginHandler);
authRouter.post("/register", registerHandler);

module.exports = authRouter;
