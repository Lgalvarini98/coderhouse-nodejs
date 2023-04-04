// const { options } = require("../../options/config");
// const knexSQL = require("knex")(options);

const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "products-inventory";

const getProducts = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const result = await dynamodb.scan(params).promise();
  const products = result.Items;
  return products;
};

const createProduct = async (data) => {
  const params = {
    TableName: TABLE_NAME,
    Item: data,
  };

  await dynamodb.put(params).promise();
};

module.exports = {
  getProducts,
  createProduct,
};
