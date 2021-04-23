const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;
const {requireAdmin} = require('../auth/authMiddleware')

<<<<<<< HEAD
//get /api/products/:id
router.get("/:id", async (req, res, next) => {
=======
// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
>>>>>>> 4ef24b0c9c629343386a28972d24fec9bb6cfa5b
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) res.send(product);
    else throw new Error("Product not found!");
  } catch (e) {
    next(e);
  }
});

<<<<<<< HEAD
//get /api/products
router.get("/", async (req, res, next) => {
=======
// POST /api/products
router.post('/',requireAdmin, async(req, res, next)=> {
>>>>>>> 4ef24b0c9c629343386a28972d24fec9bb6cfa5b
  try {

    const newProduct = req.body
    const addedProduct = await Product.create(newProduct)
    res.send(addedProduct)
  } catch (error) {
    next(error)
  }
})

// POST /api/products
router.delete('/:id', requireAdmin, async(req, res, next)=> {
  try{
    const product = await Product.findOne({
      where : {
        id : req.params.id
      }
    })
    if(product){
       await product.destroy();
       res.status(200).send('Successfully Deleted');
    }
    else {
      const error = new Error ('Product not found')
      error.status = 404
      throw error
    }

  }
  catch(error){
    next(error)
  }
})

