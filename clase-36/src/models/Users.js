const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String, required: true },
});

module.exports = mongoose.model("users", userSchema);
