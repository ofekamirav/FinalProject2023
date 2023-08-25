const coffeeService = require('../services/coffeeS');
const coffeeData = require('../Models/coffeeM');

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

  const sortProducts = async(req,res) =>{

    const sortMethod=req.body.sorting;
    let capsules;
    if(sortMethod==='price'){
      capsules=await coffeeData.find({}).sort({ price: 1 });
    }
    else if(sortMethod==='origin'){
      capsules=await coffeeData.find({}).sort({ origin: 1 });
    }
    else if(sortMethod==='intensity'){
      capsules=await coffeeData.find({}).sort({ intensity: 1 });
    }
    else
    return res.status(400).send('Invalid Sort Method Selected')
  
    res.render('allproducts',{capsules:capsules,user:req.user})

  }




module.exports={
    getCapsules,
    getCapsule,
    searchCapsule,
    sortProducts,

}