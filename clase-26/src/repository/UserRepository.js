const User = require("../models/Users");

async function findOneUser(username) {
  return await User.findOne({ username });
}

async function createUser(username, password) {
  return await User.create({
    username,
    password,
  });
}

module.exports = { findOneUser, createUser };
