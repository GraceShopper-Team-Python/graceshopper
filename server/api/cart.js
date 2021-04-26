const router = require('express').Router();
const {
  models: { Order, OrderProduct, Product },
} = require('../db');
const { requireToken } = require('../auth/authMiddleware');

router.put("/purchase/:userId", async (req, res, next) => {
  try {
    const cartOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        isCart: true,
      },
    });
    const updated = await cartOrder.update({ isCart: false });
    res.send(updated);
  } catch (e) {
    next(e);
  }
});
// GET /api/cart/:userId
router.get('/:userId', requireToken, async (req, res, next) => {
  try {
    const cartOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        isCart: true,
      },
      include: [{ model: Product }],
    });
    if (cartOrder) {
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
    } else {
      const order = await Order.create();
      await req.user.addOrder(order);
      res.send({});
    }

  } catch (error) {
    next(error);
  }
});

//Make put route for updating isCart to false

// POST /api/cart/:userId/:productId
router.post('/:userId/:productId', requireToken, async (req, res, next) => {
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

      await cartOrder.addProduct(req.params.productId, { through: { productPrice: product.price }});

      // let cartProduct = await OrderProduct.findOne({
      //   where: {
      //     productId: req.params.productId,
      //     orderId: cartOrder.id,
      //   },
      // });
      // cartProduct.productPrice = product.price;
      // await cartProduct.save();

      res.send(product);
      // if (cartProduct) {
      //   await cartProduct.increment("quantity", { by: 1 });
      // } else {
      //   await cartOrder.addProduct(req.params.productId);
      //   cartProduct = await OrderProduct.findOne({
      //     where: {
      //       productId: req.params.productId,
      //       orderId: cartOrder.id,
      //     },
      //   });
      //   cartProduct.productPrice = product.price;
      //   await cartProduct.save();
      //   res.send(cartProduct);
      //}

    } else {
      throw new Error('Product Does Not Exist');
    }
  } catch (error) {
    next(error);
  }
});

//delete /api/cart/:userId/:productId
router.delete('/:userId/:productId', requireToken, async (req, res, next) => {
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
      // cartOrder.removeProduct(product);
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

// PUT /api/cart/:userId/:productId
router.put('/:userId/:productId', requireToken, async (req, res, next) => {
  try {
     const product = await Product.findOne({
       where: {
         id: req.params.productId,
       },
     });
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

    if (req.body.increment) {
      await cartProduct.increment('quantity', { by: req.body.increment });
    } else if (req.body.decrement) {
      if (cartProduct.quantity === 1) {
        await cartProduct.destroy({
          truncate: true,
        });
        res.status(204).send('Removed from cart');
      }
      await cartProduct.decrement('quantity', { by: req.body.decrement });
    }
    res.send(product);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
