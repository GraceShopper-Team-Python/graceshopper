const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    req.user = await User.findByToken(token);
    if (req.user.id === Number(req.params.userId)) {
      next();
    } else {
      let error = new Error("Unauthorized User");
      error.status = 403;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (user.isAdmin) {
      req.user = user;
      next();
    } else {
      const error = new Error("Permission Denied");
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
