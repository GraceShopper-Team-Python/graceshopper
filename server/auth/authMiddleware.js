const {
  models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    req.user = await User.findByToken(token);
    next();
  } catch (error) {
    next(error);
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      const error = new Error('Permission Denied');
      error.status = 403;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  requireAdmin,
  requireToken,
};
