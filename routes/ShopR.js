const express = require("express");
const router = express.Router();

const CartController  = require('../controllers/Cart');
const { render } = require("ejs");
//
router.get("/Cart", CartController.registerForm);