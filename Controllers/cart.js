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
    const userId = req.session.userId; 
    const products = await cartService.getUserCartItems(userId);
    res.render('cart',{products:products})
  } catch (error) {
    res.status(500).send(error.message);
  }
};

    //Adding an item to the cart
    async function addToCart(req, res) {
      try {
      const {itemId} = req.body
      const userId=req.session.userId
      const result = await cartService.addProduct(itemId,userId)
    
        if(result.success)
        res.json(result)
      else
      res.status(400).json(result)
      }
      catch (e) { 
        res.status(500).json({ success: false, message: 'An error occurred while creating the product' });
      }    
      }



module.exports={
  isLoggedIn,
  getCartItems,
  addToCart
}