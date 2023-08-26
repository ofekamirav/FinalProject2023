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
    res.render('cart',{products:products,cart:req.session.cart})
  } catch (error) {
    res.status(500).send(error.message);
  }
};

    //Adding an item to the cart
    async function addToCart(req, res) {
      try {
      const itemId = req.body.productId
      const userId=req.session.userId

      await cartService.addProduct(userId,itemId)
    
     res.json({success:true,message:"Product Added to cart successfully"});
    
      }
      catch (e) { 
        res.status(500).json({ success: false, message: 'An error occurred while trying to add to cart' });
      }    
      }


      async function deleteFromCart(req,res){
        try{
          const itemId=req.params.productId;
          const userId=req.session.userId;

          await cartService.deleteFromCart(userId,itemId);

          res.json({success:true,message:"Product Removed"});
        }
        catch(e)
        {
          res.status(500).json({success:false,message:'Failed removing product from the cart'})
        }
      }


      const updateQuantity = async (req, res) => {
        const userId = req.session.userId;  // Assuming you store userId in session
        const { itemName2: itemId, quantity } = req.body;
      
        const result = await cartService.updateCartItemQuantity(userId, itemId, quantity);
      
        if (result.success) {
          res.json({ success: true });
        } else {
          res.status(400).json({ success: false, message: result.message });
        }
      };



module.exports={
  isLoggedIn,
  getCartItems,
  addToCart,
  deleteFromCart,
  updateQuantity
}