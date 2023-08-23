const coffeeService = require('../services/coffeeS');
const usersService = require('../services/login');

//Controller to logging in
function isLoggedIn(req, res, next) {
    if (req.session.username != null)
      return next()
    else{
      req.session.username=null
      res.render("home",{username:req.session.username})
    }
  }

const addCapsule = async (req,res) =>
{
    const newCapsula = await coffeeService.addCapsule (req.body, res.json (newCapsula))
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

  
  const handleAdminPage = async (req, res) => {
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      // If request expects JSON, return user data
      const Users = await usersService.getUsers();
      const Products=await coffeeService.getAllCoffee();
      res.json({users:Users,products:Products});
    } else {
      // Otherwise, render the EJS template
      let username=req.session.username;
      let permission = req.session.permission
      res.render('admin',{username:username,permission:permission});
    }
  }


  async function register(req, res) {
    try {
    const { username, password,firstName,lastName,country,adress,postalcode } = req.body
    const result = await usersService.register(username, password,firstName,lastName,country,adress,postalcode)
  
      if(result.success)
      res.json(result)
    else
    res.status(400).json(result)
      
      
    }
    catch (e) { 
      res.status(500).json({ success: false, message: 'An error occurred while deleting the user' });
    }    
  }

  const deleteUser= async(req,res) =>{
    try {
      const result = await usersService.deleteU(req.params._id);
      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      res.status(500).json({ success: false, message: 'An error occurred while deleting the user' });
    }
  }

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


module.exports={
    getCapsules,
    getUsers,
    addCapsule,
    isLoggedIn,
    handleAdminPage,
    deleteUser,
    deleteProduct,
    register,

}