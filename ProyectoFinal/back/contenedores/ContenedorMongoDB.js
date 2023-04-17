const mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { sendMail } = require("../utils/mails");
const { generateToken } = require("../utils/jwt");

class ContenedorMongoDB {
  constructor(connectionURI, model) {
    mongoose.set("strictQuery", false);
    mongoose.connect(connectionURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
      if (err) {
        throw new Error(`Error en la conexión de la base de datos: ${err}`);
      }
    });

    this.model = model;
  }

  // -------------------------------- Crea un producto --------------------------------
  async add(item) {
    let collection = await this.getAll();
    item.id = collection.length;
    const transactionObj = new this.model(item);
    let saveResponse = await transactionObj.save();
    return saveResponse;
  }

  // -------------------------------- Obtener todos los productos --------------------------------
  async getAll() {
    let collection = await this.model.find({});
    return collection;
  }

  // -------------------------------- Obtener un producto por code --------------------------------
  async getDescripcion(code) {
    let item = await this.model.findOne({ codigo: code });
    return item;
  }

  // -------------------------------- Obtener un producto por id --------------------------------
  async getById(id) {
    let item = await this.model.findOne({ _id: id });
    return item;
  }

  // -------------------------------- Actualiza el producto --------------------------------
  async update(id, item) {
    let transactionObj = await this.model.findOneAndUpdate({ _id: id }, item);
    return transactionObj;
  }

  // -------------------------------- Elimina el producto --------------------------------
  async delete(id) {
    let transactionObj = await this.model.deleteOne({ _id: id });
    return transactionObj;
  }

  // -------------------------------- Obtener todas las categorias --------------------------------

  async getCategorias() {
    let collection = await this.model.find({});
    let categorias = collection.map((item) => item.categoria);
    categorias = categorias.filter((item, index) => categorias.indexOf(item) === index);
    return categorias;
  }

  // -------------------------------- Obtener todos los productos de una categoria --------------------------------
  async getByCategoria(categoria) {
    if (categoria.toLowerCase() === "all") {
      let collection = await this.model.find({});
      return collection;
    } else {
      let collection = await this.model.find({ categoria: categoria.toLowerCase() });
      return collection;
    }
  }

  /* ---------------------- REGISTER --------------------------- */
  async register(item) {
    let collection = await this.getAll();

    if (collection.find((user) => user.email === item.email)) {
      throw new Error("El correo electrónico ya está en uso");
    }

    item.id = collection.length;
    const transactionObj = new this.model(item);

    let hashedPassword = await hashPassword(transactionObj.password);
    transactionObj.password = hashedPassword;

    let saveResponse = await transactionObj.save();

    let mailOptions = {
      from: `Remitente ${process.env.EMAIL_USER}`,
      to: process.env.EMAIL_USER,
      subject: "Nuevo registro de usuario",
      text: `Se ha registrado un nuevo usuario con los siguientes datos:
            \nNombre: ${item.nombre} ${item.apellido}\nEmail: ${item.email}\nTelefono: ${item.telefono}`,
    };

    sendMail(mailOptions);

    return saveResponse;
  }
  /* ---------------------- LOGIN --------------------------- */
  async login(item) {
    let collection = await this.getAll();

    for (let user of collection) {
      if (user.email === item.email) {
        const isMatch = await comparePassword(item.password, user.password);
        if (isMatch) {
          return { token: generateToken(user), admin: user.admin, email: user.email };
        } else {
          return { error: "Contraseña incorrecta" };
        }
      }
    }
    return { error: "Usuario no encontrado" };
  }
}

module.exports = ContenedorMongoDB;
