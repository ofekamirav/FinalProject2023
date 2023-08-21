const express = require('express');
const coffeeData = require('../Models/coffeeDB');
const router = express.Router();

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
