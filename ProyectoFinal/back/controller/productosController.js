const express = require("express");
const ProductosDaoMongoDB = require("../daos/ProductosDaoMongoDB");
const { verifyToken } = require("../utils/jwt");

class productosController {
  constructor() {
    this.productosRouter = express.Router();
    this.productosDaoMongoDB = new ProductosDaoMongoDB();

    // -------------------------------- Obtener todos los productos --------------------------------
    this.productosRouter.get("/productos", (req, res) => {
      const token = req.headers.authorization.substring(7);
      if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });
      
      const user = verifyToken(token);
      if (!user) return res.status(401).json({ error: "Token inválido" });

      this.productosDaoMongoDB
        .getAll()
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    // -------------------------------- Obtener la descripcion del producto --------------------------------
    this.productosRouter.get("/productos/:id", (req, res) => {
      const token = req.headers.authorization;
      if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

      const user = verifyToken(token);
      if (!user) return res.status(401).json({ error: "Token inválido" });

      this.productosDaoMongoDB
        .getById(req.params.id)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    // -------------------------------- Crea un producto --------------------------------
    this.productosRouter.post("/productos", (req, res) => {
      const token = req.headers.authorization;
      if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

      const user = verifyToken(token);
      if (!user) return res.status(401).json({ error: "Token inválido" });

      this.productosDaoMongoDB
        .add(req.body)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    // -------------------------------- Actualiza el producto --------------------------------
    this.productosRouter.put("/productos/:id", (req, res) => {
      const token = req.headers.authorization;
      if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

      const user = verifyToken(token);
      if (!user) return res.status(401).json({ error: "Token inválido" });

      this.productosDaoMongoDB
        .update(req.params.id, req.body)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    // -------------------------------- Obtener los productos por categoría --------------------------------
    this.productosRouter.get("/productos/:categoria", (req, res) => {
      const token = req.headers.authorization;
      if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

      const user = verifyToken(token);
      if (!user) return res.status(401).json({ error: "Token inválido" });

      this.productosDaoMongoDB
        .getByCategoria(req.params.categoria)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    // -------------------------------- Elimina el producto --------------------------------
    this.productosRouter.delete("/productos/:id", (req, res) => {
      const token = req.headers.authorization;
      if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

      const user = verifyToken(token);
      if (!user) return res.status(401).json({ error: "Token inválido" });

      this.productosDaoMongoDB
        .delete(req.params.id)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });
  }

  getRouter() {
    return this.productosRouter;
  }
}

module.exports = productosController;
