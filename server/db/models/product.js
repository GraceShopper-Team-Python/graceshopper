const Sequelize = require('sequelize');
const db = require('../db');


const Product = db.define ('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'Ssssssnakes'
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: "https://i.imgur.com/ml09ccU.png"
  },
  price: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Product
