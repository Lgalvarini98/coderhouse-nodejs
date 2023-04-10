const express = require("express");
const ProductosDaoMongoDB = require("../daos/ProductosDaoMongoDB");
const { verifyToken } = require("../utils/jwt");

class productosController {
  constructor() {
    this.productosRouter = express.Router();
    this.productosDaoMongoDB = new ProductosDaoMongoDB();

    this.productosRouter.get("/productos", (req, res) => {
      const token = req.headers.authorization
      if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

      const user = verifyToken(token);
      if (!user) return res.status(401).json({ error: "Token inválido" });

      this.productosDaoMongoDB
        .getAll()
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    this.productosRouter.get("/productos/:id", (req, res) => {
      const token = req.headers.authorization
      if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

      const user = verifyToken(token);
      if (!user) return res.status(401).json({ error: "Token inválido" });

      this.productosDaoMongoDB
        .getById(req.params.id)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    this.productosRouter.post("/productos", (req, res) => {
      const token = req.headers.authorization
      if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

      const user = verifyToken(token);
      if (!user) return res.status(401).json({ error: "Token inválido" });

      this.productosDaoMongoDB
        .add(req.body)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    this.productosRouter.put("/productos/:id", (req, res) => {
      const token = req.headers.authorization
      if (!token) return res.status(401).json({ error: "No se ha proporcionado un token" });

      const user = verifyToken(token);
      if (!user) return res.status(401).json({ error: "Token inválido" });

      this.productosDaoMongoDB
        .update(req.params.id, req.body)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    this.productosRouter.delete("/productos/:id", (req, res) => {
      const token = req.headers.authorization
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
