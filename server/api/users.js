const router = require('express').Router();
const {
  models: { User, Order, Product },
} = require("../db");
const { requireToken } = require("../auth/authMiddleware");

// GET /api/users
router.get('/', async (req, res, next) => {
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
//need to get require token integrated
router.get('/orders/:userId', async(req, res, next) => {
  try {
    const cartOrder = await Order.findAll({
      where: {
        userId: req.params.userId,
      },
      include: [{ model: Product }],
    })
    res.send(cartOrder);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
