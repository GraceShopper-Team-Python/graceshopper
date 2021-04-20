const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;

//get /api/products

//get /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) res.send(product);
    else throw new Error('Product not found!');
  } catch(e) {
    next(e);
  }
})

