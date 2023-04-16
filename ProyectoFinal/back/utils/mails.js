const nodemailer = require("nodemailer");

const sendMail = async (mailOptions) => {
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Correo electrónico enviado: " + info.response);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendMail,
};
