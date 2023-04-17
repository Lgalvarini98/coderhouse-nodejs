require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const authRouter = require("./routes/authRoutes.js");
const productRouter = require("./routes/productosRoutes.js");
const carritoRouter = require("./routes/carritoRoutes.js");

const app = express();
const server = http.createServer(app);

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

app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("/api", carritoRouter);

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
