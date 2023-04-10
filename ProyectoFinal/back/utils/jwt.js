const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const timeExpire = process.env.JWT_TIME_EXPIRE_HOURS;

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    admin: user.admin,
  };
  return jwt.sign(payload, secretKey, { expiresIn: timeExpire + "h" });
};

const verifyAdmin = (token) => {
  const user = verifyToken(token);
  return user.admin;
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken, verifyAdmin };
