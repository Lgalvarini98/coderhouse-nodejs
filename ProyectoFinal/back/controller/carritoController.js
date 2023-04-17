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

// class carritoController {
//   constructor() {
//     this.carritoRouter = express.Router();
//     this.carritoDaoFireBase = new CarritoDaoFireBase();

// --------------------------------- Obtener carrito ---------------------------------
// this.carritoRouter.get("/carrito/:id", async (req, res) => {
//   const token = req.headers.authorization.substring(7);
//   if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

//   const user = verifyToken(token);
//   if (!user) return res.status(401).json({ error: "Token inválido" });

//   await this.carritoDaoFireBase
//     .getById(req.params.id)
//     .then((result) => res.json(result))
//     .catch((error) => res.json(error));
// });

// --------------------------------- Crear carrito ---------------------------------
// this.carritoRouter.post("/carrito", (req, res) => {
//   const token = req.headers.authorization.substring(7);
//   if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

//   const user = verifyToken(token);
//   if (!user) return res.status(401).json({ error: "Token inválido" });

//   let carrito = {
//     timestamp: new Date().toLocaleString(),
//     products: [],
//   };

//   this.carritoDaoFireBase
//     .add(carrito)
//     .then((result) => res.json(carrito.id))
//     .catch((error) => res.json(error));
// });

// --------------------------------- Agregar productos al carrito ---------------------------------
// this.carritoRouter.post("/carrito/:id/productos", (req, res) => {
//   const token = req.headers.authorization.substring(7);
//   if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

//   const user = verifyToken(token);
//   if (!user) return res.status(401).json({ error: "Token inválido" });

//   this.carritoDaoFireBase
//     .addProduct(req.params.id, req.body)
//     .then((result) => res.json(result))
//     .catch((error) => res.json(error));
// });

// --------------------------------- Eliminar carrito ---------------------------------
// this.carritoRouter.delete("/carrito/:id", (req, res) => {
//   const token = req.headers.authorization.substring(7);
//   if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

//   const user = verifyToken(token);
//   if (!user) return res.status(401).json({ error: "Token inválido" });

//   this.carritoDaoFireBase
//     .delete(req.params.id)
//     .then((result) => res.json(result))
//     .catch((error) => res.json(error));
// });

// --------------------------------- Comprar carrito ---------------------------------
// this.carritoRouter.post("/carrito/:id", (req, res) => {
//   const token = req.headers.authorization.substring(7);
//   if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

//   const user = verifyToken(token);
//   if (!user) return res.status(401).json({ error: "Token inválido" });

//   this.carritoDaoFireBase
//     .buy(req.body.products)
//     .then((result) => res.json(result))
//     .catch((error) => res.json(error));
// });

// --------------------------------- Eliminar producto del carrito ---------------------------------
//   this.carritoRouter.delete("/carrito/:id/productos/:id_prod", (req, res) => {
//     const token = req.headers.authorization.substring(7);
//     if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

//     const user = verifyToken(token);
//     if (!user) return res.status(401).json({ error: "Token inválido" });

//     this.carritoDaoFireBase
//       .deleteProduct(req.params.id, req.params.id_prod)
//       .then((result) => res.json(result))
//       .catch((error) => res.json(error));
//   });
// }

//   getRouter() {
//     return this.carritoRouter;
//   }
// }

// module.exports = carritoController;
