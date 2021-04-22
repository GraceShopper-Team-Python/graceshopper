const router = require('express').Router();
const {
  models: { Order, Product, OrderProduct },
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
      include: [{model: Product}]
    });

    //query orderProducts table
    const cartProducts = await OrderProduct.findAll({

    //   where: {
    //     orderId: cartOrder.id,
    //   },
    //   // attributes: ['productId', 'quantity'],
    //   include: [ { model: Product } ],
    });

    res.send(cartOrder);
  } catch (error) {
    next(error);
  }
});
