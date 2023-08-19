const express = require("express");
const router = express.Router();

const loginController  = require('../controllers/login');
const { render } = require("ejs");
//
router.get("/register", loginController.registerForm);
router.post("/register", loginController.register);
router.get("/login",loginController.loginForm);
router.post("/login", loginController.login);
router.get('/logout',loginController.logout);
// router.get('/', loginController.isLoggedIn, loginController.logedIn);
router.get('/',(req,res) =>{
    res.render('ajxtesting')
})




module.exports = router;
