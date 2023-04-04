const { signup, login, profile } = require("../service/AuthService");
let userMail = null;

const getLogin = (req, res) => {
  res.render("login.handlebars");
};

const postLogin = async (req, res) => {
  const response = await login(req.body.email, req.body.password, req);
  if (response.success) res.render("main.handlebars", { email: req.body.email });
  else getLogin(req, res);
  userMail = req.body.email;
};

const getSignup = (req, res) => {
  res.render("register.handlebars");
};

const postSignup = async (req, res) => {
  const response = await signup(
    req.body.email,
    req.body.password,
    req.body.name,
    req.body.address,
    req.body.age,
    req.body.phone,
    req.body.photo,
    req
  );
  if (response.success) res.render("main.handlebars", { email: req.body.email });
  else getSignup(req, res);
  userMail = req.body.email;
};

const postLogout =
  ("/logout",
  (req, res) => {
    req.session.destroy();
    let cookies = req.cookies;
    for (let cookie in cookies) {
      res.clearCookie(cookie);
    }
    res.redirect("/login");
  });

const getFailLogin = (req, res) => res.render("faillogin.handlebars");
const getFailSignup = (req, res) => res.render("failsignup.handlebars");

const getProfile = async (req, res) => {
  const response = await profile();
  const { email, name, address, age, phone, photo } = response;

  res.render("profileInfo.handlebars", { email, name, address, age, phone, photo });
};

const Main = (req, res) => {
  res.render("main.handlebars", { email: userMail });
};

module.exports = {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  postLogout,
  getFailLogin,
  getFailSignup,
  getProfile,
  Main,
};
