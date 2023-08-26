const express = require("express");
const router = express.Router();

const cartController  = require('../controllers/cart');


router.get('/', cartController.isLoggedIn, cartController.getCartItems);
router.post('/addToCart',cartController.addToCart)
router.delete('/deleteProduct/:productId',cartController.deleteFromCart)
router.put('/Quantity', cartController.updateQuantity);






module.exports = router;
