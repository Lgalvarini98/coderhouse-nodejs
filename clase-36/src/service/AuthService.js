const bcrypt = require("bcrypt");
const { findOneUser, createUser } = require("../repository/UserRepository");

// ------------------ NODEMALILER ------------------

const createTransport = require("nodemailer").createTransport;

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "frances.cartwright@ethereal.email",
    pass: "3WDGXWgNQGW42pmCD9",
  },
});

const mailOptions = {
  from: "servidor node",
  to: "frances.cartwright@ethereal.email",
  subject: "Nuevo usuario registrado",
  html: "<h1>Se ha registrado un nuevo usuario</h1>",
};

async function sendMails() {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
}

const hashed = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
const validHash = (password, user) => bcrypt.compareSync(password, user.password);
let userEmail = null;

async function signup(email, password, name, address, age, phone, photo, req) {
  try {
    const user = await findOneUser(email);
    userEmail = email;

    if (user) return { success: false, message: "User already exists" };

    const newUser = await createUser(email, hashed(password), name, address, age, phone, photo);
    req.session.user = newUser.email;
    sendMails();
    return { success: true, message: "User created" };
  } catch (err) {
    return { success: false, message: "Error occurred" };
  }
}

async function login(email, password, req) {
  try {
    const user = await findOneUser(email);

    userEmail = email;
    if (!user) return { success: false, message: "User not found" };

    if (!validHash(password, user)) return { success: false, message: "Wrong password" };
    req.session.user = user.email;
    return { success: true, message: "User logged in" };
  } catch (err) {
    return { success: false, message: "Error occurred" };
  }
}

async function profile() {
  try {
    const user = await findOneUser(userEmail);
    return user;
  } catch (err) {
    return { success: false, message: "Error occurred" };
  }
}

module.exports = { signup, login, profile };
