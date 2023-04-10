const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw new Error('Error al hashear la contraseña');
  }
}

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error(error);
    throw new Error('Error al verificar la contraseña');
  }
}

module.exports = {
    hashPassword,
    comparePassword
}
