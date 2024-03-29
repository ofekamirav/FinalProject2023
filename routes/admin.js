const express = require("express");
const router = express.Router();

const adminController  = require('../controllers/admin');


// router.get('/', adminController.isLoggedIn,adminController.getUsers);
router.get('/', adminController.isLoggedIn, adminController.handleAdminPage);
router.post('/adduser',adminController.register)
router.post('/addProduct',adminController.addProduct)
router.delete('/deleteUser/:_id',adminController.deleteUser)
router.delete('/deleteProduct/:_id',adminController.deleteProduct)
router.put('/updateProduct/:productId', adminController.updateProduct);
router.get('/data',adminController.getData);





module.exports = router;
