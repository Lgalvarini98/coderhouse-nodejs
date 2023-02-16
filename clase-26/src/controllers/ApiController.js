const Index = (req, res) => res.send("Bienvenido a mi servidor");

const Main = (req, res) => {
  res.render("main.handlebars");
};


module.exports = {
  Index,
  Main,
};
