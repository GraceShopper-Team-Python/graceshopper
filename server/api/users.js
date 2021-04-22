const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const requireToken = require("../auth/authMiddleware");

//get /api/users
router.get("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ["id", "username"],
      });
      res.json(users);
    } else {
      const err = new Error("Permission Denied");
      err.status = 403;
      throw err;
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
