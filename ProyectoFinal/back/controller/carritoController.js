const CarritoDaoFireBase = require("../daos/CarritoDaoFireBase");
const carritoDaoFireBase = new CarritoDaoFireBase();

// ------- Obtener carrito -------
function getCart(req, res) {
  carritoDaoFireBase
    .getById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
}

// ------- Crear carrito -------
function createCart(req, res) {
  let carrito = {
    timestamp: new Date().toLocaleString(),
    products: [],
  };

  carritoDaoFireBase
    .add(carrito)
    .then((result) => res.json(carrito.id))
    .catch((error) => res.json(error));
}

// ------- Agregar producto al carrito -------
function addProductCart(req, res) {
  carritoDaoFireBase
    .addProduct(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
}

// ------- Eliminar carrito -------
function deleteCart(req, res) {
  carritoDaoFireBase
    .delete(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
}

// ------- Comprar carrito -------
function buyCart(req, res) {
  carritoDaoFireBase
    .buy(req.body.products)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
}

// ------- Eliminar producto del carrito -------
function deleteProductCart(req, res) {
  carritoDaoFireBase
    .deleteProduct(req.params.id, req.params.id_prod)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
}

module.exports = {
  getCart,
  createCart,
  addProductCart,
  deleteCart,
  buyCart,
  deleteProductCart,
};