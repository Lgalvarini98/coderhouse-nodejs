const bcrypt = require("bcrypt");

const { findOneUser, createUser } = require("../repository/UserRepository");

const hashed = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
const validHash = (password, user) => bcrypt.compareSync(password, user.password);

async function signup(username, password, req) {
  try {
    const user = await findOneUser(username);

    if (user) return { success: false, message: "User already exists" };

    const newUser = await createUser(username, hashed(password));
    req.session.user = newUser.username;
    return { success: true, message: "User created" };
  } catch (err) {
    return { success: false, message: "Error occurred" };
  }
}

async function login(username, password, req) {
  try {
    const user = await findOneUser(username);

    if (!user) return { success: false, message: "User not found" };

    if (!validHash(password, user)) return { success: false, message: "Wrong password" };
    req.session.user = user.username;
    return { success: true, message: "User logged in" };
  } catch (err) {
    return { success: false, message: "Error occurred" };
  }
}

// async function signup(email, password, name, address, age, phone, photo, req) {
//   try {
//     const user = await findOneUser(email);

//     if (user) return { success: false, message: "User already exists" };

//     const newUser = await createUser(email, hashed(password), name, address, age, phone, photo);
//     req.session.user = newUser.email;
//     return { success: true, message: "User created" };
//   } catch (err) {
//     return { success: false, message: "Error occurred" };
//   }
// }

// async function login(username, password, req) {
//   try {
//     const user = await findOneUser(email);

//     if (!user) return { success: false, message: "User not found" };

//     if (!validHash(password, user)) return { success: false, message: "Wrong password" };
//     req.session.user = user.email;
//     return { success: true, message: "User logged in" };
//   } catch (err) {
//     return { success: false, message: "Error occurred" };
//   }
// }

module.exports = { signup, login };
