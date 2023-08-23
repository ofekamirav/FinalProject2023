const express = require("express");
const router = express.Router();

const adminController  = require('../controllers/admin');


// router.get('/', adminController.isLoggedIn,adminController.getUsers);
router.get('/', adminController.isLoggedIn, adminController.handleAdminPage);
router.post('/adduser',adminController.register)
router.delete('/deleteUser/:_id',adminController.deleteUser)
router.delete('/deleteProduct/:_id',adminController.deleteProduct)





module.exports = router;
