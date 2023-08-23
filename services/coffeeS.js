const coffeeData = require('../models/coffeeM');


//Creating a new Capsule
async function addCapsule(name, origin,type,intensity,flavor,price) {
  try{
      const product = new coffeeData({
          _id: name,
          origin:origin,
          type:type,
          intensity:intensity,
          flavor:flavor,
          price:price,
         
          
      });
      const newP =await product.save()
      if(newP)
        return{success:true,message:'Product Created successfully'}
      else
      return {success:false,message:'Couldnt Create'}
      
    }catch(err){
      console.log(err);
      throw err;
    }      
  }

async function getAllCoffee()
{
  return await coffeeData.find({});
}

 async function getCapsule(Name){
  try {
    const data = await coffeeData.findOne({ _id: Name });
    return data; // Return the document found (or null if not found)
  } catch (error) {
    // Handle any errors that might occur during the database operation
    console.error("Error fetching capsule:", error);
    throw error;
  }
  }




async function deleteP(productId)  {
  try {
    const result = await coffeeData.findByIdAndRemove(productId);
    if (result) {
      return { success: true, message: 'Product deleted successfully' };
    } else {
      return { success: false, message: 'Product not found' };
    }
  } catch (err) {
    throw err;
  }
};
   

module.exports = {
    addCapsule,
    getAllCoffee,
    getCapsule,
    deleteP
   
 };
