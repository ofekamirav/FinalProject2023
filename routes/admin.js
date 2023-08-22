const express = require("express");
const router = express.Router();

const adminController  = require('../controllers/admin');


// router.get('/', adminController.isLoggedIn,adminController.getUsers);
router.get('/', adminController.isLoggedIn, adminController.handleAdminPage);
router.delete('/delete/:_id',adminController.deleteUser)





module.exports = router;
