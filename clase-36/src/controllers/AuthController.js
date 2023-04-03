const { signup, login } = require("../service/AuthService");

const getLogin = (req, res) => {
  res.render("login.handlebars");
};

const postLogin = async (req, res) => {
  const response = await login(req.body.user, req.body.password, req);
  if (response.success) res.render("main.handlebars", { user: req.body.user });
  else getLogin(req, res);
};

const getSignup = (req, res) => {
  res.render("register.handlebars");
};

const postSignup = async (req, res) => {
  const response = await signup(req.body.user, req.body.password, req);
  if (response.success) res.render("main.handlebars", { user: req.body.user });
  else getSignup(req, res);
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

module.exports = {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  postLogout,
  getFailLogin,
  getFailSignup,
};
