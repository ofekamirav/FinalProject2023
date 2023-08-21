

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Product = require("../models/product");



// Add bodyParser and cookieParser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

router.get('/', async (req, res) => {
  const cartItems = req.cookies.ProductCart || [];

  try {
    // Retrieve the product data from the database for each product in the cart
    const productNames = cartItems.map(item => item.name);
    const products = await Product.find({ name: { $in: productNames } });
    // console.log(productNames);
    console.log(cartItems);

    res.render('cart', { cartItems, products });
  } catch (error) {
    console.error('Error retrieving product data:', error);
    res.send('Error retrieving product data');
  }
});

router.post('/', async (req, res) => {
  console.log("Order");

  const buttonText = req.body.action;
  console.log(buttonText);

  if (buttonText === 'delete') {
    const { itemName } = req.body;
    const cartItems = req.cookies.ProductCart || [];

    // Find the index of the item to be deleted in the cart
    const itemIndex = cartItems.findIndex(item => item.name === itemName);

    if (itemIndex !== -1) {
      // Remove the item from the cart
      cartItems.splice(itemIndex, 1);
    }

    // Update the 'ProductCart' cookie with the modified cart
    res.cookie('ProductCart', cartItems);

    // Redirect back to the same page
    res.redirect('/cart');
  } else if (buttonText === 'Q') {
    const itemName = req.body.itemName2;
    const quantity = req.body[`quantity-${itemName}`];

    const cartItems = req.cookies.ProductCart || [];

    // Find the index of the item to be deleted in the cart
    const itemIndex = cartItems.findIndex(item => item.name === itemName);
    console.log(cartItems);

    if (itemIndex !== -1) {
      // Remove the item from the cart
      cartItems.splice(itemIndex, 1);
    }

    // Add the item back with the updated quantity
    cartItems.push({ name: itemName, quantity: parseInt(quantity) });
    console.log(cartItems);

    // Update the cookie with the updated cart items
    res.cookie('ProductCart', cartItems);

    // Redirect to the Cart page or perform any other necessary actions
    res.redirect('/cart');
  } 
  if (buttonText === 'buy') {
    const username=req.cookies.username;
    console.log(username);
    if(!username)//not connected-> sign in page.  
      res.redirect('/login');
      else{
    const totalPrice = req.body.totalPrice;
    res.cookie("totalPrice",totalPrice);
    res.render('check',{totalPrice:totalPrice});
      
  }
  }
});

router.post('/delete', (req, res) => {
  const { itemName } = req.body;
  const cartItems = req.cookies.ProductCart || [];

  // Find the index of the item to be deleted in the cart
  const itemIndex = cartItems.findIndex(item => item.name === itemName);

  if (itemIndex !== -1) {
    // Remove the item from the cart
    cartItems.splice(itemIndex, 1);
  }

  // Update the 'ProductCart' cookie with the modified cart
  res.cookie('ProductCart', cartItems);

  // Redirect back to the same page
  res.redirect('/cart');
});

router.post('/Quantity', (req, res) => {
  const itemName = req.body.itemName2;
  const quantity = req.body[`quantity-${itemName}`];

  const cartItems = req.cookies.ProductCart || [];

  // Find the index of the item to be deleted in the cart
  const itemIndex = cartItems.findIndex(item => item.name === itemName);

  if (itemIndex !== -1) {
    // Remove the item from the cart
    cartItems.splice(itemIndex, 1);
  }

  // Add the item back with the updated quantity
  cartItems.push({ name: itemName, quantity: parseInt(quantity) });

  // Update the cookie with the updated cart items
  res.cookie('ProductCart', cartItems);

  // Redirect to the Cart page or perform any other necessary actions
  res.redirect('/cart');
});

// ...

module.exports = router;


