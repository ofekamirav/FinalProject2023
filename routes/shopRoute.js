const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const sortBy = req.body.sorting; // Get the selected sorting option

    let capsule;
    if (sortBy === 'capsule-name') {
      capsule = await capsule.find({quantity: { $gt: 0 } }).sort({ name: 1 });
    } else if (sortBy === 'product-price') {
      products = await capsule.find({quantity: { $gt: 0 } }).sort({ price: 1 });
    } else if (sortBy === 'product-brand') {
      products = await capsule.find({quantity: { $gt: 0 } }).sort({ brand: 1 });
    } else {
      // Handle invalid sorting option
      return res.status(400).send('Invalid sorting option');
    }

    res.render('allproducts', { products });
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

      res.redirect('/allproducts');
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

      res.redirect('/allproducts');
    } else {
      res.send('Invalid request');
    }
  } else {
    res.send('Invalid request');
  }
});

module.exports = router;
