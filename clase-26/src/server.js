require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const mongoose = require("mongoose");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const { normalize, schema } = require("normalizr");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// ------------------ faker ------------------

const { options } = require("../options/config");
const knexMariaDB = require("knex")(options);
const { generateProducts } = require("../db/productos-test");

// ------------------ faker ------------------

const handlebarsConfig = {
  defaultLayout: "index.handlebars",
};

app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", exphbs.engine(handlebarsConfig));
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("./views"));

// --------------------------------- SESSION  ---------------------------------

const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

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

app.post("/logout", (req, res) => {
  req.session.destroy();
  let cookies = req.cookies;
  for (let cookie in cookies) {
    res.clearCookie(cookie);
  }
  res.redirect("/login");
});

// ------------------------ PASSPORT -----------------------------

let username;

app.post("/login", (req, res) => {
  username = req.body;

  if (req.session.counter) {
    req.session.counter++;
  } else {
    req.session.counter = 1;
  }
  res.redirect("/main");
});

const client = new MongoClient(uri, { useNewUrlParser: true });

app.post("/signup", (req, res) => {
  let username = req.body.user;
  let password = req.body.password;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error(err);
      return;
    }

    password = hash;
  });

  client.connect((err) => {
    const collection = client.db("test").collection("users");
    const user = {
      username: "johndoe",
      password: "secret",
      email: "johndoe@example.com",
    };

    collection.findOne({ username: user.username }, (err, result) => {
      if (result) {
        console.log("User already exists.");
      } else {
        collection.insertOne(user, (err, result) => {
          console.log("User registered successfully.");
        });
      }
      client.close();
    });
  });

  if (req.session.counter) {
    req.session.counter++;
  } else {
    req.session.counter = 1;
  }
  //res.redirect("/");
});

// ------------------------ PASSPORT -----------------------------

// --------------------------------- SESSION  ---------------------------------

app.get("/login", (req, res) => {
  res.render("login.handlebars");
});

app.get("/signup", (req, res) => {
  res.render("register.handlebars");
});

app.get("/main", (req, res) => {
  res.render("main.handlebars", { username });
});

// ---------------------------- FAKER ----------------------------

const productFaker = generateProducts();

productFaker.map((objeto) => {
  knexMariaDB("product")
    .insert(objeto)
    .then(() => console.log("productFaker inserted"))
    .catch((err) => {
      console.log(err);
      throw err;
    });
});

// ---------------------------- /FAKER ----------------------------

// ------------------- FIREBASE ----------------------

var admin = require("firebase-admin");
// const { createHash } = require("crypto");
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

httpServer.listen(8080, async function () {
  await mongoose.connect("mongodb+srv://lucho:c8m2etCeW340Sy5a@cluster0.w6djkta.mongodb.net/test");
  console.log("Servidor corriendo");
});
