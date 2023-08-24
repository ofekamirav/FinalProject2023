const coffeeData = require('../Models/coffeeM');
const User = require('../models/Users')


// services/userService.js



const getUserCartItems = async (username) => {
  const user = await User.findById(username);
  const cartItemIds = user.cart.map(item => item.itemId);
  const products = await coffeeData.find({ '_id': { $in: cartItemIds } });
  return products;
};


module.exports = {
    getUserCartItems,
  
   
 };