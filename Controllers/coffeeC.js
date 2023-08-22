const coffeeService = require('../services/coffeeS');

const addCapsule = async (req,res) =>
{
    const newCapsula = await coffeeService.addCapsule (req.body, res.json (newCapsula))
}

const getCapsules = async (req , res) =>{
    const Capsules = await coffeeService.getAllCoffee()
    let username=req.session.username;
    let permission = req.session.permission;
    res.render('allproducts',{capsules:Capsules,username:username,permission:permission})
  }

  const getCapsule=async (req,res) => {
    const capsuleName = req.query.name
    let username=req.session.username;
    const capsule = await coffeeService.getCapsule(capsuleName)
    res.render('capsule',{capsule,username})
  }


module.exports={
    getCapsules,
    getCapsule

}