const coffeeService = require('../services/coffeeS');

const addCapsule = async (req,res) =>
{
    const newCapsula = await coffeeService.addCapsule (req.body, res.json (newCapsula))
}

const getCapsules = async (req , res) =>{
    const Capsules = await coffeeService.getAllCoffee()
    let username=req.session.username;
    res.render('allproducts',{capsules:Capsules,username:username})
  }


module.exports={
    getCapsules
}