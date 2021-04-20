const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  orderTotal: {
    type: Sequelize.DECIMAL(10, 2),
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Order;
