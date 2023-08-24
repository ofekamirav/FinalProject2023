const cartService = require('../services/cart');


//Controller to logging in
function isLoggedIn(req, res, next) {
    if (req.session.username != null)
      return next()
    else{
      req.session.username=null
      res.render("home",{username:req.session.username})
    }
  }


  const getCartItems = async (req, res) => {
  try {
    const username = req.session.username; // Assuming the username is stored in req.user
    const products = await cartService.getUserCartItems(username);
    res.render('cart',{products:products})
  } catch (error) {
    res.status(500).send(error.message);
  }
};



module.exports={
  isLoggedIn,
  getCartItems
}