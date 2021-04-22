const {
  models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {

    const token = req.headers.authorization;
 console.log('IN MIDDLEWARE TOKEN',token,'----->>>>>>' );
    req.user = await User.findByToken(token);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = requireToken;
