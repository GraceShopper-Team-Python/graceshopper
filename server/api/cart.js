const router = require("express").Router();
const {
  models: { Order },
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
  } catch (error) {
    next(error);
  }
});
