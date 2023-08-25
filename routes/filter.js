const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path'); 
const cookieParser = require('cookie-parser');
const Product = require("../Models/coffeeM"); 

const publicPath = path.join(__dirname, '../public');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(publicPath));

router.get('/', async (req, res) => {
    res.render('filter',{}); 

  });

router.post('/filter', async (req, res) => {
    try {   
      const sortBy = req.body.filters; 
  
      let products;
      if (sortBy === 'origin') {
        products = await Product.find({ origin: "Colombia", quantity: { $gt: 0 } }).sort({ name: 1 });
      } else if (sortBy === 'price') {
        products = await Product.find({ gender: "male", quantity: { $gt: 0 } }).sort({ price: 1 });
      } else {
        // Handle invalid sorting option
        return res.status(400).send('Invalid sorting option');
      }
  
      res.render('allproducts', { products }); // Corrected template name
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });