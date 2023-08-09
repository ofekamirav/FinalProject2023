const coffeeData = require('../Models/coffeeDB');

const createCapsule = async (Country, Name, Type,Intensity, Flavor,Price ) =>      
// Save  new capsule to the collection
{
    const Newcapsule = new Capsule({ Country, Name, Type, Intensity, Flavor, Price });  
    return await Newcapsule.save();
    };

// const getCapsuleById = async (id) => {
//     return await Capsule.findById(id);
// };

const getCapsulesByCountry = async (country) => {
    return await Capsule.find({Country: country});
};

const getCapsuleByName = async (name) => {
    return await Capsule.find({Name: name});
 };

//  const updateOne= async (Name) => {
//     return await Capsule ({Price: price})
//  }
   
const updateCapsule = async (Name, Country) => {
    const capsule = await getCapsuleByName(Name);
    if (!capsule)
        return null;

        capsule.Name =Name;
        await capsule.save();
        return capsule;
    };

const deleteCapsule = async (Name) => {
    const capsule =  await getCapsuleByName(Name);
    if (!capsule)
        return null;

    await capsule.remove();
    return capsule;
};

module.exports = {
    createCapsule,
   // getCapsuleById,
    getCapsulesByCountry,
    getCapsuleByName,
    updateCapsule,
    deleteCapsule };
