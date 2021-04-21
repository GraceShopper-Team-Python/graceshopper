const router = require("express").Router();
const {
  models: { Order, OrderProduct, Product },
} = require("../db");
module.exports = router;

// GET /api/cart/:userId
router.get("/:userId", async (req, res, next) => {
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
      attributes: ["productId", "quantity"],
    });

    res.send(cartProducts);
  } catch (error) {
    next(error);
  }
});

// POST /api/cart/:userId/:productId
router.post("/:userId/:productId", async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId,
      },
    });
    if (product) {
      const cartOrder = await Order.findOne({
        where: {
          userId: req.params.userId,
          isCart: true,
        },
      });
      let cartProduct = await OrderProduct.findOne({
        where: {
          productId: req.params.productId,
        },
      });
      if (cartProduct) await cartProduct.increment("quantity", { by: 1 });
      else {
        cartProduct = await cartOrder.addProduct(req.params.productId);
        console.log("NEW PRODUCT---->>>>>", cartProduct);
      }

      res.send(cartProduct);
    } else {
      throw new Error("Product Does Not Exist");
    }
  } catch (error) {
    next(error);
  }
});
