const router = require('express').Router();
const {
  models: { Order, OrderProduct },
} = require('../db');
module.exports = router;

// GET /api/cart/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const cartOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        isCart: true,
      },
    });

    //query orderProducts table
    const cartProducts = await OrderProduct.findAll({
      where: {
        orderId: cartOrder.id,
      },
      attributes: ['productId', 'quantity'],
    });

    res.send(cartProducts);
  } catch (error) {
    next(error);
  }
});
