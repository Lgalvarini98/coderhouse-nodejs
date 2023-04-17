const ProductosDaoMongoDB = require("../daos/ProductosDaoMongoDB");
const productosDaoMongoDB = new ProductosDaoMongoDB();

// ---------- Obtener todos los productos ----------
function getAll(req, res) {
  productosDaoMongoDB
    .getAll()
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
}

// ---------- Obtener un producto por su código ----------
function getDescripcion(req, res) {
  productosDaoMongoDB
    .getDescripcion(req.params.codigo)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
}

// ---------- Agregar un producto ----------
function add(req, res) {
  productosDaoMongoDB
    .add(req.body)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
}

// ---------- Actualizar un producto por su id ----------
function update(req, res) {
  productosDaoMongoDB
    .update(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
}

// ---------- Eliminar un producto por su id ----------
function deleteProducto(req, res) {
  productosDaoMongoDB
    .delete(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
}

// ---------- Obtener todas las categorías ----------
function getCategorias(req, res) {
  productosDaoMongoDB
    .getCategorias()
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json({ error: "Error al obtener categorías" }));
}

// ---------- Obtener productos por categoría ----------
function getByCategoria(req, res) {
  productosDaoMongoDB
    .getByCategoria(req.params.categoria)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
}



const productosController = {
  getAll,
  getDescripcion,
  add,
  update,
  delete: deleteProducto,
  getCategorias,
  getByCategoria,
};

module.exports = productosController;
