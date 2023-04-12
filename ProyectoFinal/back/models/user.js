const mongoose = require("mongoose");

const usersCollection = "users";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, max: 255 },
  password: { type: String, require: true, max: 255 },
  nombre: { type: String, require: true, max: 255 },
  apellido: { type: String, require: true, max: 255 },
  telefono: { type: String, require: true, max: 255 },
  admin: { type: Boolean, require: false, default: false },
  messages: { type: Array, require: false, default: [] },
});

module.exports = mongoose.model(usersCollection, userSchema);
