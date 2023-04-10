require("dotenv").config();
const express = require("express");

const authController = require("./controller/authController.js");
const productosController = require("./controller/productosController.js");
const carritoController = require("./controller/carritoController.js");

const app = express();
const PORT = process.env.PORT || 8080;
var cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const athController = new authController();
app.use("/api", athController.getRouter());

const prdController = new productosController();
app.use("/api", prdController.getRouter());

const carrController = new carritoController();
app.use("/api", carrController.getRouter());

app
  .listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  })
  .on("error", (error) => console.log(error));
