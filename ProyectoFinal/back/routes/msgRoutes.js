const express = require("express");
const msgRouter = express.Router();
const msgController = require("../controller/msgController");

// ----------------- Obtener todos los mensajes -----------------
msgRouter.get("/mensajes", msgController.getAllMessages);

module.exports = msgRouter;
