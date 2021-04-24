const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

const { requireAdmin } = require("../auth/authMiddleware");

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) res.send(product);
    else throw new Error("Product not found!");
  } catch (e) {
    next(e);
  }
});

// POST /api/products
router.post("/", requireAdmin, async (req, res, next) => {
  try {
    const newProduct = req.body;
    const addedProduct = await Product.create(newProduct);
    res.send(addedProduct);
  } catch (error) {
    next(error);
  }
});

// PUT /api/products/:id
router.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const { name, imageUrl, description, price, stock } = req.body;
    const product = await Product.findByPk(req.params.id);
    product.name = name;
    product.imageUrl = imageUrl;
    product.description = description;
    product.price = price;
    product.stock = stock;
    await product.save();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/products/:id
router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (product) {
      await product.destroy();
      res.status(200).send("Successfully Deleted");
    } else {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
