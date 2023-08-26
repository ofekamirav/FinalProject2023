const orderService = require('../services/order');


const createOrder= async (req,res)=>{
    try {
        
        const user = req.user;  // Assuming you have user in the request (from session or token)

        if (!user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        const result = await orderService.createOrder(user, req.body.items);

        res.json(result);

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }

}


const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await orderService.getUserOrders(userId);

        res.render('myUser', { orders });
    } catch (error) {
        console.error("Error fetching user's orders:", error);
        res.status(500).render('myUser', { message: 'Failed to fetch orders.' }); // assuming you have an error page to render
    }
}


module.exports={
    createOrder,
    getUserOrders,

  }