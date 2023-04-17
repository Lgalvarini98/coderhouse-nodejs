require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const authRouter = require("./routes/authRoutes.js");
const productRouter = require("./routes/productosRoutes.js");
const carritoRouter = require("./routes/carritoRoutes.js");
const msgRouter = require("./routes/msgRoutes.js");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server);
const Mensaje = require("./models/messages.js");

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_PATH, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión a MongoDB establecida correctamente");
  })
  .catch((error) => {
    console.log("Error al conectar a MongoDB", error);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("/api", carritoRouter);
app.use("/api", msgRouter);

// ----------------- SOCKET IO -----------------

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");

  socket.on("enviar-mensaje", async (mensaje) => {
    const msgComplete = {
      ...mensaje,
      receptor: "coderhouse@gmail.com",
      fecha: Date.now(),
    };
    const msg = new Mensaje(msgComplete);

    await msg.save();
    io.emit("mensaje-recibido", msg);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
