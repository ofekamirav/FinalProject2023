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
      res.json(Users);
    } else {
      // Otherwise, render the EJS template
      let username=req.session.username;
      res.render('admin',{username:username});
    }
  }


module.exports={
    getCapsules,
    getUsers,
    addCapsule,
    isLoggedIn,
    handleAdminPage,

}