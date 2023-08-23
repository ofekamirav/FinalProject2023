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
    res.render('capsule',{capsule,username,permission:req.session.permission})
  }

  const searchCapsule = async(req,res) =>{
    try {
      const searchValue = req.body.searchValue;
      const products = await coffeeService.searchCapsule(searchValue)
      res.json(products);
    } catch (error) {
      console.error("Failed to search products:", error);
      res.status(500).json({ error: "Failed to search products" });
    }
  }




module.exports={
    getCapsules,
    getCapsule,
    searchCapsule

}