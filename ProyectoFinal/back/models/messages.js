const mongoose = require("mongoose");

const chatCollection = "chat";

const chatSchema = new mongoose.Schema({
  emisor: { type: String, required: true, max: 255 },
  receptor: { type: String, required: true, max: 255 },
  contenido: { type: String, required: true, max: 1000 },
  fecha: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model(chatCollection, chatSchema);
