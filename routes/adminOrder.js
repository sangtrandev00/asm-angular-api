const express = require("express");

const adminOrderController = require("../controllers/adminOrders");
const uploadMiddleware = require("../middleware/upload");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
const { check, body } = require("express-validator");

// GET orders
router.get("/orders", isAuth, adminOrderController.getOrders);

// GET random orders

router.get("/orders-random", isAuth, adminOrderController.randomOrders);

// GET ORDER ID
router.get("/orders/:orderId", isAuth, adminOrderController.getOrder);

// POST ORDER
// router.post("/user",adminOrderController.postUser);

// PATCH ORDER
// router.put("/order/:orderId",adminOrderController.updateOrder);

router.patch("/orders/:orderId", isAuth, adminOrderController.updateOrderStatus);

// DELETE ORDER
router.delete("/orders/:orderId", isAuth, adminOrderController.deleteOrder);

module.exports = router;
