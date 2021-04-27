const router = require('express').Router();
const { requireToken, requireAdmin } = require('../auth/authMiddleware')

router.use('/users', requireToken,require('./users'));
router.use('/products', require('./products'));
router.use('/cart', requireToken, require('./cart'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;

