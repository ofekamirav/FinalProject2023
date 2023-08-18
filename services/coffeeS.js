const coffeeData = require('../models/coffeeM');

async function addCapsule (Origin, Name, Type,Intensity, Flavor,Price ){      
// Save  new capsule to the collection
try{
    const Newcapsule = new Capsule({ Origin: Origin, Name: Name, Type: Type, Intensity: Intensity, Flavor: Flavor, Price: Price });
    console.log('Item saved successfully.');
    return await Newcapsule.save();
   
  
}
catch (error) {
    console.error('Error occurred while adding item:', error);
    return false;
}
};

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
  async function findByNameAndDelete(name)
  {
    let result = await Capsule.findByNameAndDelete(name);
    if(!result)
    {
      return false;
    }
    else{
        await capsule.remove();
        return true;
    }
}

const deleteCoffee = async (Name) => {
  const coffee = await getSpecCoffee(Name);
  if (!article)
      return null;

  await coffee.remove()
  return coffee;
};
   

module.exports = {
    addCapsule,
    getAllCoffee,
    getCapsule,
   deleteCoffee
 };
