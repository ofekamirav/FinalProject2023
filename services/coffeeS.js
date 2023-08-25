const coffeeData = require('../Models/coffeeM');


//Creating a new Capsule
async function addCapsule(name, origin,type,intensity,flavor,price) {
  try{
      const product = new coffeeData({
          Name: name,
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
    const data = await coffeeData.findOne({ Name: { $regex: Name, $options: 'i' } });
    return data;
  } catch (error) {
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


async function searchCapsule(name){
  const data = await coffeeData.find({ Name: { $regex: name, $options: 'i' } }).limit(10);
  return data;
}


const updateProduct = async (productId, productDetails) => {
    try {
  
        const product = await coffeeData.findByIdAndUpdate(productId, productDetails, { new: true });
        if (!product) {
            throw new Error('Product not found');
        }
      
        return product;
    } catch (error) {
        throw error;
    }
};
   

module.exports = {
    addCapsule,
    getAllCoffee,
    getCapsule,
    deleteP,
    searchCapsule,
    updateProduct,
   
 };
