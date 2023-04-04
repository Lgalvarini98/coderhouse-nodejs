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

// async function findOneUser(email) {
//   return await User.findOne({ email });
// }

// async function createUser(username, password) {
//   return await User.create({
//     email,
//     password,
//     name,
//     address,
//     age,
//     phone,
//     photo
//   });
// }

module.exports = { findOneUser, createUser };
