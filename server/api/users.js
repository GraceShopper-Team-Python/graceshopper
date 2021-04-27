const router = require('express').Router();
const {
  models: { User, Order, Product },
} = require("../db");
const { requireAdmin } = require("../auth/authMiddleware");

// GET /api/users
router.get('/', requireAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//get /api/users/orders
router.get('/orders', async(req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id,
        isCart: false,
      },
      include: [{ model: Product }],
    })

    let ordersObj = {};

    orders.map((order) => {
      ordersObj[order.id] = { products: order.products.map((product) => {
      let productObj = {};
          productObj.name = product.name
          productObj.price = product.price
          productObj.quantity = product.orderProduct.quantity
          return productObj
        }), orderDate: order.updatedAt
      }
    })
    res.send(ordersObj);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
