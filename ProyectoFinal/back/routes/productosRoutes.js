const express = require("express");
const productRouter = express.Router();
const productosController = require("../controller/productosController");
const { verifyToken } = require("../utils/jwt");

// Middleware para verificar el token
productRouter.use((req, res, next) => {
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

// ------- Obtener todos los productos -------
productRouter.get("/productos", productosController.getAll);

// ------- Obtener un producto por su código -------
productRouter.get("/productos/:codigo", productosController.getDescripcion);

// ------- Agregar un producto -------
productRouter.post("/productos", productosController.add);

// ------- Actualizar un producto por su id -------
productRouter.put("/productos/:id", productosController.update);

// ------- Eliminar un producto por su id -------
productRouter.delete("/productos/:id", productosController.delete);

// ------- Obtener todas las categorías -------
productRouter.get("/categorias", productosController.getCategorias);

// ------- Obtener todos los productos de una categoría -------
productRouter.get("/categoria/:categoria", productosController.getByCategoria);

module.exports = productRouter;
