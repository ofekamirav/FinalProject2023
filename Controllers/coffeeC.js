const coffeeService = require('../services/coffeeS');

const addCapsule = async (req,res) =>
{
    const newCapsula = await coffeeService.addCapsule (req.body, res.json (newCapsula))
}

const getCapsules = async (req , res) =>{
    const Capsules = await coffeeService.getAllCoffee()
    res.render('allproducts',{capsules:Capsules,})
  }

  const getCapsule=async (req,res) => {
    const capsuleName = req.query.name
    const capsule = await coffeeService.getCapsule(capsuleName)
    res.render('capsule',{capsule})
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