const express = require("express");
const router = express.Router();
const orderController  = require('../controllers/order');

router.get('/createOrder',orderController.getUserOrders)

module.exports = router;
