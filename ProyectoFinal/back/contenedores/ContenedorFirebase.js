const admin = require("firebase-admin");
const serviceAccount = require("../config/ecommercech-57b78-firebase-adminsdk-35rpz-2596fbe369.json");
const { sendMail } = require("../utils/mails");

class ContenedorFireBase {
  constructor(collectionName) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    this.db = admin.firestore();
    this.query = this.db.collection(collectionName);
  }

  // ----------------- Crea el carrito -----------------
  async add(item) {
    const querySnapshot = await this.query.get();
    let docs = querySnapshot.docs;
    let doc = this.query.doc(`${docs.length}`);
    item.id = docs.length;
    await doc.create(item);
  }

  // ----------------- Obtiene el carrito -----------------
  async getById(id) {
    let doc = this.query.doc(`${id}`);

    const item = await doc.get();
    return item.data();
  }

  // ----------------- Eliminar carrito -----------------
  async delete(id) {
    let doc = this.query.doc(`${id}`);
    await doc.delete();
    return "item eliminado correctamente";
  }

  // ----------------- Orden de compra -----------------
  async buy(products) {
    let mailOptions = {
      from: `Remitente ${process.env.EMAIL_USER}`,
      to: process.env.EMAIL_USER,
      subject: "Nueva orden de compra",
      text: `Se ha registrado una nueva orden de compra con los siguientes productos:
      ${products.map((product) => {
        return `
        Producto: ${product.nombre}
        Codigo: ${product.codigo}
        Precio: ${product.precio}
        `;
      })}
      `,
    };

    sendMail(mailOptions);
    return "Orden de compra exitosa";
  }

  
}

module.exports = ContenedorFireBase;
