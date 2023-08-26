const coffeeService = require('../services/coffeeS');
const usersService = require('../services/Users');
const ordersService=require('../services/order')

//Controller to logging in
function isLoggedIn(req, res, next) {
    if (req.session.username != null)
      return next()
    else{
      req.session.username=null
      res.render("home",{username:req.session.username})
    }
  }


const getCapsules = async (req , res) =>{
    const Capsules = await coffeeService.getAllCoffee()
    let username=req.session.username;
    res.render('admin',{capsules:Capsules,username:username})
  }

  const getUsers = async (req , res) =>{
    const Users = await usersService.getUsers();
    let username=req.session.username;
    //res.render('admin',{users:Users,username:username})
    res.json(Users);
  }

  
  // const handleAdminPage = async (req, res) => {
  //   if (req.headers.accept && req.headers.accept.includes('application/json')) {
  //     // If request expects JSON, return user data
  //     const Users = await usersService.getUsers();
  //     const Products=await coffeeService.getAllCoffee();
  //     res.json({users:Users,products:Products});
  //   } else {
  //     // Otherwise, render the EJS template
  //     let username=req.session.username;
  //     let permission = req.session.permission
  //     res.render('admin',{username:username,permission:permission});
  //   }
  // }

  //New Handling with orders:
  const handleAdminPage = async (req, res) => {
    try {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        // If request expects JSON, return user data, product data, and order data
        const Users = await usersService.getUsers();
        const Products = await coffeeService.getAllCoffee();
        const Orders = await ordersService.getAllOrders();  // assuming you have an ordersService
  
        res.json({ users: Users, products: Products, orders: Orders });
      } else {
        // Otherwise, render the EJS template
        let username = req.session.username;
        let permission = req.session.permission
        res.render('admin', { username: username, permission: permission });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  }


  //Creating a new User using the admin page
  async function register(req, res) {
    try {
    const { email, password,firstName,lastName,country,address,postalcode } = req.body
    const result = await usersService.register(email, password,firstName,lastName,country,address,postalcode)
  
      if(result.success)
      res.json(result)
    else
    res.status(400).json(result)
    }
    catch (e) { 
      res.status(500).json({ success: false, message: 'An error occurred while creating the user' });
    }    
  }


    //Creating a new Product using the admin panel
    async function addProduct(req, res) {
      try {
      const { name, origin,type,intensity,flavor,price} = req.body
      const result = await coffeeService.addCapsule(name, origin,type,intensity,flavor,price)
    
        if(result.success)
        res.json(result)
      else
      res.status(400).json(result)
      }
      catch (e) { 
        res.status(500).json({ success: false, message: 'An error occurred while creating the product' });
      }    
      }



  //Deleting a user via the Admin panel
  const deleteUser= async(req,res) =>{
    try {
      const result = await usersService.deleteU(req.params._id);
      if (result.success) {
        res.send(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      res.status(500).json({ success: false, message: 'An error occurred while deleting the user' });
    }
  }

  //Deleting a product via the Admin panel
  const deleteProduct= async(req,res) =>{
    try {
      const result = await coffeeService.deleteP(req.params._id);
      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      res.status(500).json({ success: false, message: 'An error occurred while deleting the product' });
    }
  }

  
  //Updating Product Data:

const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const productDetails = req.body;

    try {
        const updatedProduct = await coffeeService.updateProduct(productId, productDetails);
        res.status(200).json({
            success: true,
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//Test 
const coffeeData = require('../Models/coffeeM');
  const getData= async (req, res) => {
    try {
      const data = await coffeeData.aggregate([
        {
          $group: {
            _id: '$origin',
            count: { $sum: 1 },
          },
        },
      ]);
     
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}; 


module.exports={
    getCapsules,
    getUsers,
    isLoggedIn,
    handleAdminPage,
    deleteUser,
    deleteProduct,
    register,
    addProduct,
    updateProduct,
    getData


}