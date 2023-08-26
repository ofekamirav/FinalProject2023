const coffeeData = require('../Models/coffeeM');
const User = require('../models/Users')


// services/userService.js



// const getUserCartItems = async (userId) => {
//   const user = await User.findById(userId);
//   const cartItemIds = user.cart.map(item => item.itemId);
//   const products = await coffeeData.find({ '_id': { $in: cartItemIds } });

//   return products;
// };

const getUserCartItems = async (userId) => {
  const user = await User.findById(userId);
  const cartItemIds = user.cart.map(item => item.itemId);
  const products = await coffeeData.find({ '_id': { $in: cartItemIds } });
  
  // Map products with their quantity from the cart
  const productsWithQuantity = products.map(product => {
    const item = user.cart.find(i => i.itemId.toString() === product._id.toString());
    return {
      ...product._doc, 
      quantity: item ? item.quantity : 0
    };
  });

  return productsWithQuantity;
};


//Adding a new product
async function addProduct(userId,itemId) {
  try{
    
    const user = await User.findById(userId);
  
    var existed =0;
    for(let i=0;i<user.cart.length;i++)
    {
      if(user.cart[i].itemId.toString()===itemId.toString())
      {
      user.cart[i].quantity+=1;
      existed=1;
      await user.save()
      }
    }
    if(existed==0)
    {
      await User.findByIdAndUpdate(userId,{
        $push:{cart:{itemId:itemId,quantity:1}}
      })
    }
    }catch(err){
      console.log(err);
      throw err;
    }      
  }

  async function deleteFromCart(userId,itemId)
  {
    try {
      const result = await User.findByIdAndUpdate(
          userId,
          { $pull: { cart: { itemId: itemId } } },
          { new: true }  // returns the modified document
      );

      if (!result) {
          return { success: false, message: 'User not found' };
      }

      return { success: true, message: 'Product removed from cart' };

  } catch (e) {
      console.error(e);
      return { success: false, message: 'Error occurred while removing product' };
  }
  }

  const updateCartItemQuantity = async (userId, itemId, newQuantity) => {
    try {
      const user = await User.findOne({ _id: userId });
  
      if (!user) {
        throw new Error('User not found.');
      }
  
      const cartItem = user.cart.find(item => item.itemId.toString() === itemId);
  
      if (!cartItem) {
        throw new Error('Item not found in cart.');
      }
  
      cartItem.quantity = newQuantity;
      await user.save();
  
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

module.exports = {
    getUserCartItems,
    addProduct,
    deleteFromCart,
    updateCartItemQuantity
  
   
 };