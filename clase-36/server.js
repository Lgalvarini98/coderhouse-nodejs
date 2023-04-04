require("dotenv").config();

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { engine } = require("express-handlebars");

const express = require("express");
const app = express();

const MongoStore = require("connect-mongo");
const session = require("express-session");
const mongoose = require("mongoose");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const cookieParser = require("cookie-parser");

const passport = require("passport");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const { getMessages, createMessage, normalizerMsg } = require("./src/utils/messages");
const { getProducts, createProduct } = require("./src/utils/products");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_PATH,
      mongoOptions: advancedOptions,
      ttl: 600,
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

// Rutas permitidas sin comprobación de sesión
const allowedRoutes = ["/login", "/signup"];
app.use((req, res, next) => {
  if (req.session.user || allowedRoutes.includes(req.url)) {
    next();
  } else {
    res.status(401).redirect("/login");
  }
});

const handlebarsConfig = {
  defaultLayout: "index.handlebars",
};

app.use(express.static("./views"));
app.engine("handlebars", engine(handlebarsConfig));
app.set("views", "./views");
app.set("view engine", "handlebars");

// ------------------------- ROUTES -------------------------

const router = require("./src/routes/router");
app.use(router);

// ------------------ RANDOM ------------------

const randomsRouter = require("./src/routes/randoms");
app.use("/api/randoms", randomsRouter);

// ------------------ AWS ------------------

// app.use(passport.initialize());
// app.use(passport.session());

// ------------------------- MENSAJES Y PRODUCTOS -------------------------

io.on("connection", async (socket) => {
  // ---------------------- MENSAJES ----------------------
  let response = await getMessages();
  const { normalizedMsg, result } = normalizerMsg(response, true);
  socket.emit("messages", normalizedMsg, result);

  socket.on("newMessage", async (data) => {
    createMessage({ ...data, date: new Date().toLocaleString() });
    let response = await getMessages();
    socket.emit("messages", normalizerMsg(response, false).normalizedMsg, result);
  });

  // ---------------------- PRODUCTOS ----------------------
  socket.emit("productos", await getProducts());

  socket.on("newProduct", async (product) => {
    createProduct(product);
    socket.emit("productos", await getProducts());
  });
});

// ------------------------------------------------------------
const server = httpServer.listen(8080, () => {
  mongoose.connect(process.env.MONGO_PATH);
  console.log("Servidor corriendo");
});
server.on("error", (err) => console.log(`Error: ${err}`));
