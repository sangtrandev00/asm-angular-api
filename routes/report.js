const express = require("express");
const reportController = require("../controllers/report");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
const { check, body } = require("express-validator");

// GET reports/
// router.get("/reports", reportController.getReports);

router.get("/reports/summary", reportController.getReportsSummary);

// GET PRODUCT
// router.get("/reports/:productId", reportController.getProduct);

// // POST reset password

// // GET CATES
// router.get("/categories", reportController.getCategories);

// // GET MAX PRICE
// router.get("/product-max-price", reportController.getMaxPrice);

// // GET MIN PRICE
// router.get("/product-min-price", reportController.getMinPrice);

// // GET CATES -- ID
// router.get("/categories/:categoryId", reportController.getCategory);

// // router.get('/status', reportController.getUserStatus)

// router.patch("/reports/:productId", reportController.updateViews);

// // POST ORDER
// router.post("/order", reportController.postOrder);

// // GET ORDER: id
// router.get("/orders/:orderId", reportController.getOrder);

// // GET USER: id

// router.get("/users/:userId", reportController.getUser);

module.exports = router;
