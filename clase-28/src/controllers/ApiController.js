const Index = (req, res) => res.send("Bienvenido a mi servidor");

const Info = (req, res) => {
  res.render("info.handlebars");
};

const Main = (req, res) => {
  res.render("main.handlebars");
};

module.exports = {
  Index,
  Main,
  Info,
};
