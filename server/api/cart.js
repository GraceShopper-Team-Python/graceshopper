const router = require("express").Router();
const {
  models: { Order , OrderProduct},
} = require("../db");
module.exports = router;

// GET /api/cart/:userId
router.get("/cart/:userId", async (req, res, next) => {
  try {
    const cartOrder = Order.findOne({
      where: {
        userId: req.params.userId,
        isCart: true,
      },
    });
    //query orderProducts table
    const cartProducts = OrderProduct.findAll({
      where: {
        orderId: cartOrder.id
      },
    })
    res.send(cartProducts)
  } catch (error) {
    next(error);
  }
});
