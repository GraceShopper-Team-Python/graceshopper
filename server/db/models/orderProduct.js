const Sequelize = require("sequelize");
const db = require("../db");

const OrderProduct = db.define("orderProduct", {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
    defaultValue: 1,
  },
  productPrice: {
    type: Sequelize.INTEGER,
  },
});

module.exports = OrderProduct;
