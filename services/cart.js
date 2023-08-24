const coffeeData = require('../Models/coffeeM');
const User = require('../models/Users')


// services/userService.js



const getUserCartItems = async (userId) => {
  const user = await User.findById(userId);
  const cartItemIds = user.cart.map(item => item.itemId);
  const products = await coffeeData.find({ '_id': { $in: cartItemIds } });
  return products;
};

//Adding a new product
async function addProduct(itemId) {
  try{
      const product = new coffeeData({
          Name: name,
          origin:origin,
          type:type,
          intensity:intensity,
          flavor:flavor,
          price:price,
         
          
      });
      const newP =await product.save()
      if(newP)
        return{success:true,message:'Product Created successfully'}
      else
      return {success:false,message:'Couldnt Create'}
      
    }catch(err){
      console.log(err);
      throw err;
    }      
  }


module.exports = {
    getUserCartItems,
    addProduct
  
   
 };