const coffeeData = require('../Models/coffeeDB');

async function addCapsule (Origin, Name, Type,Intensity, Flavor,Price ){      
// Save  new capsule to the collection
try{
    const Newcapsule = new Capsule({ Origin: Origin, Name: Name, Type: Type, Intensity: Intensity, Flavor: Flavor, Price: Price });
    return await Newcapsule.save();
    console.log('Item saved successfully.');
    return true;
}
catch (error) {
    console.error('Error occurred while adding item:', error);
    return false;
}
};

async function capsuleList()
{
  const capsule= 
  await Capsule.find();
  return capsule;
}

 async function findByName(name){
    let data = await Capsule.findByName(name); 
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
   

module.exports = {
    addCapsule,
   capsuleList,
   findByName,
   findByNameAndDelete
 };
