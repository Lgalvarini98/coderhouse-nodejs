const mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");
const nodemailer = require("nodemailer");

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

  async add(item) {
    let collection = await this.getAll();
    item.id = collection.length;
    const transactionObj = new this.model(item);
    let saveResponse = await transactionObj.save();
    return saveResponse;
  }

  async getAll() {
    let collection = await this.model.find({});
    return collection;
  }

  async getById(id) {
    let item = await this.model.findOne({ _id: id });
    return item;
  }

  async update(id, item) {
    let transactionObj = await this.model.findOneAndUpdate({ _id: id }, item);
    return transactionObj;
  }

  async delete(id) {
    let transactionObj = await this.model.deleteOne({ _id: id });
    return transactionObj;
  }

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
    return saveResponse;
  }

  async login(item) {
    let collection = await this.getAll();

    for (let user of collection) {
      if (user.email === item.email) {
        const isMatch = await comparePassword(item.password, user.password);
        if (isMatch) {
          return { token: generateToken(user), admin: user.admin };
        } else {
          return { error: "Contraseña incorrecta" };
        }
      }
    }
    return { error: "Usuario no encontrado" };
  }
}

module.exports = ContenedorMongoDB;
