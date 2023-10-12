const express = require("express");
const adminProductsController = require("../controllers/adminProducts");
const uploadMiddleware = require("../middleware/upload");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
const { check, body } = require("express-validator");

// GET PRODUCTS
router.get("/products", isAuth, adminProductsController.getProducts);

// GET BY RANGES[MIN, MAX];

// router.get("/products-by-price-range", adminProductsController.getProductsInRange);
router.get("/random-products", isAuth, adminProductsController.createRandomProducts);

// GET PRODUCT

router.get("/products/:productId", isAuth, adminProductsController.getProduct);

// POST PRODUCT
router.post("/product", isAuth, adminProductsController.postProduct);

// PUT PRODUCT
router.put("/product/:productId", isAuth, adminProductsController.updateProduct);

// DELETE PRODUCT
router.delete("/products/:productId", isAuth, adminProductsController.deleteProduct);

module.exports = router;
