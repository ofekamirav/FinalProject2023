const express = require('express');
const coffeeData = require('../Models/coffeeDB');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path'); 
const cookieParser = require('cookie-parser');

// Get the filter button and filters div
var filterBtn = document.getElementById("filterBtn");
var filters = document.getElementById("filters");

// Add a click event listener to the filter button
filterBtn.addEventListener("click", function() {
    // Toggle the display of the filters div
    if (filters.style.display === "none" || filters.style.display === "") {
        filters.style.display = "block";
    } else {
        filters.style.display = "none";
    }
});



// MiddleWare
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

router.get('/', async (req, res) => {
  try {
    products = await Product.find({ gender: "male", quantity: { $gt: 0 } });
    res.render('men', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const sortBy = req.body.sorting; 

    let products;
    if (sortBy === 'name') {
      products = await Product.find({ gender: "male", quantity: { $gt: 0 } }).sort({ name: 1 });
    } else if (sortBy === 'price') {
      products = await Product.find({ gender: "male", quantity: { $gt: 0 } }).sort({ price: 1 });
    } else {
      // Handle invalid sorting option
      return res.status(400).send('Invalid sorting option');
    }

    res.render('men', { products }); // Corrected template name
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/Addto', (req, res) => {
  const action = req.body.action;

  if (action) {
    const [actionType, productName] = action.split(':');

    if (actionType === 'cart') {
      // Retrieve the existing cart items from the cookie
      const existingCart = req.cookies.ProductCart || [];

      // Check if the product already exists in the cart
      const existingProductIndex = existingCart.findIndex(item => item.name === productName);

      if (existingProductIndex !== -1) {
        // If the product already exists, update its quantity
        existingCart[existingProductIndex].quantity += 1;
      } else {
        // If the product doesn't exist, add it with quantity 1
        existingCart.push({ name: productName, quantity: 1 });
      }

      // Set the updated cart items to the "ProductCart" cookie
      res.cookie('ProductCart', existingCart, { maxAge: 86400000 }); // Cookie expires in 24 hours

      // Log the value of the "ProductCart" cookie
      console.log('ProductCart:', existingCart);

      res.redirect('/men');
    } else if (actionType === 'wishlist') {
      // Add the product name to the "ProductWishList" cookie
      const existingWishlist = req.cookies.ProductWishList || [];

      // Check if the product already exists in the wishlist
      const existingProductIndex = existingWishlist.findIndex(item => item.name === productName);

      if (existingProductIndex !== -1) {
        // If the product already exists, update its quantity
        existingWishlist[existingProductIndex].quantity += 1;
      } else {
        // If the product doesn't exist, add it with quantity 1
        existingWishlist.push({ name: productName, quantity: 1 });
      }

      // Set the updated wishlist items to the "ProductWishList" cookie
      res.cookie('ProductWishList', existingWishlist, { maxAge: 86400000 }); // Cookie expires in 24 hours

      // Log the value of the "ProductWishList" cookie
      console.log('ProductWishList:', existingWishlist);

      res.redirect('/men');
    } else {
      res.send('Invalid request');
    }
  } else {
    res.send('Invalid request');
  }
});

module.exports = router;





















/*
router.post('/', async (req, res) => {
  try {
    const sortBy = req.body.sorting; // Get the selected sorting option

    let coffeeData;
    if (sortBy === 'capsule-name') {
      capsule = await coffeeData.find({quantity: { $gt: 0 } }).sort({ name: "" });
    } else if (sortBy === 'capsule-price') {
      capsule = await coffeeData.find({quantity: { $gt: 0 } }).sort({ price: 1 });
    } else if (sortBy === 'capsule-country') {
      capsule = await coffeeData.find({quantity: { $gt: 0 } }).sort({ country: "" });
    } else {
      // Handle invalid sorting option
      return res.status(400).send('Invalid sorting option');
    }

    res.render('allcapsules', {capsule});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/Addto', (req, res) => {
  const action = req.body.action;

  if (action) {
    const [actionType, capsuleName] = action.split(':');

    if (actionType === 'cart') {
      // Check if the product already exists in the cart
      const existingProductIndex = existingCart.findIndex(item => item.name === capsuleName);

      if (existingProductIndex !== -1) {
        // If the product already exists, update its quantity
        existingCart[existingProductIndex].quantity += 1;
      } else {
        // If the product doesn't exist, add it with quantity 1
        existingCart.push({ name: capsuleName, quantity: 1 });
      }


      res.redirect('/allproducts');
    } else {
      res.send('Invalid request');
    }
  } else {
    res.send('Invalid request');
  }
});

module.exports = router;
*/