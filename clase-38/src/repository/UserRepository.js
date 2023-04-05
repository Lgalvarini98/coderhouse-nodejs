const User = require("../models/Users");

async function findOneUser(email) {
  return await User.findOne({ email });
}

async function createUser(email, password, name, address, age, phone, photo) {
  return await User.create({
    email,
    password,
    name,
    address,
    age,
    phone,
    photo,
  });
}

module.exports = { findOneUser, createUser };
