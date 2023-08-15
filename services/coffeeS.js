const coffeeData = require('../Models/coffeeM');

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

 async function getSpecCoffee(Name){
    let data = await coffeeData.findOne({Name:Name})
    if(!data){
      return false;
    }
    else{
      return(data);
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
   getSpecCoffee,
   deleteCoffee
 };
