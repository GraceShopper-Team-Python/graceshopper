//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/product");
const Order = require("./models/order");
const OrderProduct = require("./models/orderProduct");

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });


module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderProduct,
  },
};
