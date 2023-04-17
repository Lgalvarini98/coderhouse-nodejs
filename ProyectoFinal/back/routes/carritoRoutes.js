const express = require("express");
const carritoRouter = express.Router();
const carritoController = require("../controller/carritoController");
const { verifyToken } = require("../utils/jwt");

// Middleware para verificar el token
carritoRouter.use((req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No se ha proporcionado un token" });
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
});

// -------------------- Rutas protegidas por token --------------------

// ------- Obtener carrito -------
carritoRouter.get("/carrito/:id", carritoController.getCart);

// ------- Crear carrito -------
carritoRouter.post("/carrito", carritoController.createCart);

// ------- Agregar producto al carrito -------
carritoRouter.post("/carrito/:id/productos", carritoController.addProductCart);

// ------- Eliminar carrito -------
carritoRouter.delete("/carrito/:id", carritoController.deleteCart);

// ------- Comprar carrito -------
carritoRouter.post("/carrito/:id", carritoController.buyCart);

// ------- Eliminar producto del carrito -------
carritoRouter.delete("/carrito/:id/productos/:id_prod", carritoController.deleteProductCart);

module.exports = carritoRouter;
