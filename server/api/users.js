const router = require("express").Router();
const {
  models: { User, Order, Product },
} = require("../db");
const { requireToken } = require("../auth/authMiddleware");

//get /api/users
router.get("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ["id", "username"],
      });
      res.json(users);
    } else {
      const err = new Error("Permission Denied");
      err.status = 403;
      throw err;
    }
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
