const contenedorFireBase = require("../contenedores/ContenedorFirebase");
const ProductosDaoMongoDB = require("../daos/ProductosDaoMongoDB");

class CarritoDaoFireBase extends contenedorFireBase {
  constructor() {
    super("carritos");
  }

  // ----------------- Agregar producto al carrito -----------------
  async addProduct(id, product) {
    const contenedorMongoDBasd = new ProductosDaoMongoDB();

    let productMongoDB = await contenedorMongoDBasd.getById(product.productId);

    let productAdd = {
      _id: product.productId,
      nombre: productMongoDB.nombre,
      descripcion: productMongoDB.descripcion,
      codigo: productMongoDB.codigo,
      thumbnail: productMongoDB.thumbnail,
      precio: productMongoDB.precio,
      categoria: productMongoDB.categoria,
    };

    let doc = this.query.doc(`${id}`);
    const item = await doc.get();
    let cpItem = { ...item.data() };

    cpItem.products.push(productAdd);

    await doc.update(cpItem);
  }

  // ----------------- Eliminar producto del carrito -----------------
  async deleteProduct(carritoId, productoId) {
    let doc = this.query.doc(`${carritoId}`);
    const item = await doc.get();
    let cpItem = { ...item.data() };
    cpItem.products = cpItem.products.filter((prd) => prd._id !== productoId);
    await doc.update(cpItem);
  }
}

module.exports = CarritoDaoFireBase;
