const coffeeData = require('../Models/coffeeM');
const Order = require('../Models/order');

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
    console.log(order);

    await order.save();

    return { success: true, message: 'Order created successfully' };
};


const getUserOrders = async (userId) => {

    return await Order.find({user:userId});
}




module.exports={
    createOrder,
    getUserOrders,

  }
