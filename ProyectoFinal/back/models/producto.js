const mongoose = require("mongoose");

const productosCollection = "productos";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, require: true, max: 255 },
  descripcion: { type: String, require: true, max: 255 },
  codigo: { type: String, require: true, max: 255 },
  thumbnail: { type: String, require: false, max: 255 },
  precio: { type: String, require: true },
  categoria: { type: String, require: true, max: 255 },
});

module.exports = mongoose.model(productosCollection, productoSchema);
