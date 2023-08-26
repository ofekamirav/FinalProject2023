const coffeeData = require('../Models/coffeeM');
const Order = require('../Models/order');
const User = require('../models/Users')

const createOrder = async (user, items) => {
    // Calculate totalAmount
    let totalAmount = 0;
    for (let item of items) {
        const product = await coffeeData.findById(item.itemId);
        totalAmount += product.price * item.quantity;
    }

    // Create the order
    let order = new Order({
        user: user._id,
        items: items,
        totalAmount: totalAmount,
        username: user.username 
    });
   

    const cartUser= await User.findById(user._id)
    cartUser.cart=[];
   await cartUser.save();

    await order.save();

    return { success: true, message: 'Order created successfully' };
};


const getUserOrders = async (userId) => {

    // return await Order.find({user:userId});
    return await Order.find({ user: userId }).populate('items.itemId');

}

const getAllOrders = async () => {
    try {
    
      const orders = await Order.find({}).populate('items.itemId');
      
      return orders;
    } catch (error) {
      throw error;
    }
  }




module.exports={
    createOrder,
    getUserOrders,
    getAllOrders,

  }
