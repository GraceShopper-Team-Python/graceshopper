const router = require('express').Router();
const {
  models: { Order, OrderProduct, Product },
} = require('../db');


router.put("/purchase", async (req, res, next) => {
  try {
    const cartOrder = await Order.findOne({
      where: {
        userId: req.user.id,
        isCart: true,
      },
    });
    const updated = await cartOrder.update({ isCart: false });
    res.send(updated);
  } catch (e) {
    next(e);
  }
});
// GET /api/cart/
router.get('/',  async (req, res, next) => {
  try {
    const cartOrder = await Order.findOne({
      where: {
        userId: req.user.id,
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


// POST /api/cart/products/:productId
router.post('/products/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId,
      },
    });
    if (product) {
      const cartOrder = await Order.findOne({
        where: {
          userId: req.user.id,
          isCart: true,
        },
      });

      await cartOrder.addProduct(req.params.productId, { through: { productPrice: product.price }});



      res.send(product);


    } else {
      throw new Error('Product Does Not Exist');
    }
  } catch (error) {
    next(error);
  }
});

//delete /api/cart/products/:productId
router.delete('/products/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId,
      },
    });
    if (product) {
      const cartOrder = await Order.findOne({
        where: {
          userId: req.user.id,
          isCart: true,
        },
      });
      //TODO  cartOrder.removeProduct(product);
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

// PUT /api/cart/products/:productId
router.put('/products/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId,
      },
    });
    const cartOrder = await Order.findOne({
      where: {
        userId: req.user.id,
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
