require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");

const authRouter = require("./routes/authRoutes.js");
const productosController = require("./controller/productosController.js");
const carritoController = require("./controller/carritoController.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_PATH;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión a MongoDB establecida correctamente");
  })
  .catch((error) => {
    console.log("Error al conectar a MongoDB", error);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", authRouter);

const prdController = new productosController();
app.use("/api", prdController.getRouter());

const carrController = new carritoController();
app.use("/api", carrController.getRouter());

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
