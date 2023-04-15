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

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // Manejador de evento para cuando un usuario se une al chat
  socket.on("join", (userId) => {
    // Autenticar al usuario aquí
    socket.join(userId);
    console.log(`Usuario ${userId} se ha unido al chat`);
  });

  // Manejador de evento para cuando un usuario envía un mensaje
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    // Guardar el mensaje en la base de datos aquí
    console.log(`Mensaje enviado de ${senderId} a ${receiverId}: ${message}`);

    // Emitir el mensaje a los usuarios correspondientes
    socket.to(receiverId).emit("receiveMessage", { senderId, message });
  });

  // Manejador de evento para cuando un usuario se desconecta
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
