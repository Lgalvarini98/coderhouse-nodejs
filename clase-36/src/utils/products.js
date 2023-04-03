const { options } = require("../../options/config");
const knexSQL = require("knex")(options);

const getProducts = async () => {
  return await knexSQL.from("product").select("*");
};

const createProduct = async (data) => {
  knexSQL("product")
    .insert(data)
    .then(() => console.log("product inserted"))
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports = {
  getProducts,
  createProduct,
};
