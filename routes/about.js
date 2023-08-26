const express = require('express');
const router = express.Router();

// Define the route for the About page
router.get('/', (req, res) => {
  res.render('aboutUs',{username:req.session.username,permission:req.session.permission,apiKey:process.env.mapKey}); 
});

module.exports = router;
