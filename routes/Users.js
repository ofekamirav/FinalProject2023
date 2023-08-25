const express = require("express");
const router = express.Router();

const loginController  = require('../controllers/Users');
const { render } = require("ejs");

const adminController=require('../controllers/admin');

router.get("/register", loginController.registerForm);
router.post("/register", adminController.register);
// router.post("/register", loginController.register);
router.get("/login",loginController.loginForm);
router.post("/login", loginController.login);
router.get('/logout',loginController.logout);
router.get('/', loginController.isLoggedIn, loginController.logedIn);





module.exports = router;
