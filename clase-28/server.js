require("dotenv").config();
const express = require("express");
const app = express();

const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);

const { Server: IOServer } = require("socket.io");
const io = new IOServer(httpServer);

const { normalize, schema } = require("normalizr");
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

const session = require("express-session");
const mongoose = require("mongoose");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// ------------------ faker ------------------
const { options } = require("./options/config");
const knexMariaDB = require("knex")(options);

const randomsRouter = require("./src/routes/randoms");

app.use("/api/randoms", randomsRouter);

// ---------------------------- /FAKER ----------------------------

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

app.use((req, res, next) => {
  if (req.session.user || req.url == "/login" || req.url == "/signup") {
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

//*******************************************************************//
// ROUTES:
const router = require("./src/routes/router");
app.use(router);

//*******************************************************************//
// ------------------- FIREBASE ----------------------
var admin = require("firebase-admin");
var serviceAccount = require(process.env.CREDENTIAL_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const query = db.collection("messages").orderBy("date", "asc");
const queryCollection = db.collection("messages");
// ------------------- /FIREBASE ----------------------

// ------------------------- MENSAJES -------------------------
io.on("connection", async (socket) => {
  console.log("El usuario", socket.id, "se ha conectado");

  socket.on("disconnect", () => {
    console.log("El usuario", socket.id, "se ha desconectado");
  });

  // ---------------------- FIREBASE MSG ----------------------
  const querySnapshot = await query.get();
  let docs = querySnapshot.docs;

  let response = docs.map((doc) => ({
    id: doc.id,
    author: {
      id: doc.data().author.id,
      nombre: doc.data().author.nombre,
      apellido: doc.data().author.apellido,
      edad: doc.data().author.edad,
      alias: doc.data().author.alias,
      avatar: doc.data().author.avatar,
    },
    text: doc.data().text,
    date: doc.data().date,
  }));

  // ---------------------- NORMALIZR ----------------------

  const authorSchema = new schema.Entity("author");
  const msgSchema = new schema.Entity(
    "messages",
    {
      author: authorSchema,
    },
    { idAttribute: "id" }
  );

  let normalizedMsg = normalize(response, [msgSchema]);

  let dataSize = JSON.stringify(response).length;
  let dataNormSize = JSON.stringify(normalizedMsg).length;
  let result = 100 - (dataNormSize * 100) / dataSize;

  socket.emit("messages", normalizedMsg, result);

  // ---------------------- NORMALIZR ----------------------

  // ---------------------- FIREBASE MSG ----------------------

  knexMariaDB
    .from("product")
    .select("*")
    .then((data) => socket.emit("productos", data));

  socket.on("newMessage", async (data) => {
    let newMsg = {
      ...data,
      date: new Date().toLocaleString(),
    };

    // ---------------------- FIREBASE NEW MSG ----------------------
    const doc = queryCollection.doc();
    await doc.create(newMsg);

    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    let response = docs.map((doc) => ({
      id: doc.id,
      author: {
        id: doc.data().author.id,
        nombre: doc.data().author.nombre,
        apellido: doc.data().author.apellido,
        edad: doc.data().author.edad,
        alias: doc.data().author.alias,
        avatar: doc.data().author.avatar,
      },
      text: doc.data().text,
      date: doc.data().date,
    }));
    // ---------------------- NORMALIZR NEW MSG ----------------------
    let normalizedMsg = normalize(response, [msgSchema]);
    // ---------------------- NORMALIZR NEW MSG ----------------------

    socket.emit("messages", normalizedMsg, result);
    // ---------------------- FIREBASE NEW MSG ----------------------
  });

  socket.on("newProduct", (product) => {
    knexMariaDB("product")
      .insert(product)
      .then(() => console.log("product inserted"))
      .catch((err) => {
        console.log(err);
        throw err;
      });

    knexMariaDB
      .from("product")
      .select("*")
      .then((data) => socket.emit("productos", data));
  });
});

// ------------------------------------------------------------

const server = httpServer.listen(8080, async () => {
  await mongoose.connect("mongodb+srv://luciano:otxv1s9X4q9qO8e1@cluster0.w6djkta.mongodb.net/test");
  console.log("Servidor corriendo");
});
server.on("error", (err) => console.log(`Error: ${err}`));
