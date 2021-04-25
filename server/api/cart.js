const router = require("express").Router();
const {
  models: { Order, OrderProduct, Product },
} = require("../db");
const { requireToken } = require("../auth/authMiddleware");

// GET /api/cart/:userId
router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    const cartOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        isCart: true,
      },
      include: [{ model: Product }],
    });

    let userCart = {};
    cartOrder.products.map((product) => {
      userCart[product.id] = {
        quantity: product.orderProduct.quantity,
        price: product.price,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
      };
    });

    res.send(userCart);
  } catch (error) {
    next(error);
  }
});

// POST /api/cart/:userId/:productId
router.post("/:userId/:productId", requireToken, async (req, res, next) => {
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
          orderId: cartOrder.id,
        },
      });
      if (cartProduct) {
        await cartProduct.increment("quantity", { by: 1 });
      } else {
        await cartOrder.addProduct(req.params.productId);
        cartProduct = await OrderProduct.findOne({
          where: {
            productId: req.params.productId,
            orderId: cartOrder.id,
          },
        });
        cartProduct.productPrice = product.price;
        await cartProduct.save();
      }
      res.send(cartProduct);
    } else {
      throw new Error("Product Does Not Exist");
    }
  } catch (error) {
    next(error);
  }
});

//delete /api/cart/:userId/:productId
router.delete("/:userId/:productId", requireToken, async (req, res, next) => {
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
          orderId: cartOrder.id,
        },
      });
      if (cartProduct) {
        await cartProduct.destroy({
          truncate: true,
        });
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
