const coffeeData = require('../Models/coffeeDB');

const createCapsule = async (Country, Name, Type,Intensity, Flavor,Price ) =>      
// Save  new capsule to the collection
{
    const Newcapsule = new Capsule({ Country, Name, Type, Intensity, Flavor, Price });  
    return await Newcapsule.save();
    };

const getCapsuleById = async (id) => {
    return await Capsule.findById(id);
};

const getCapsulesBycountry = async (country) => {
    return await Capsule.find({Country: country});
};

const getCapsuleByName = async (name) => {
    return await Capsule.find({Name: name});
 };

 const updateOne= async (country) => {
    return await Capsule ({Price: price})
 }
   
const updateCapsule = async (id, Name) => {
    const capsule = await getCapsuleById(id);
    if (!capsule)
        return null;

        capsule.Name = Name;
        await capsule.save();
        return capsule;
    };

const deleteCapsule = async (id) => {
    const capsule = await getCapsuleById(id);
    if (!capsule)
        return null;

    await capsule.remove();
    return capsule;
};

module.exports = {
    createCapsule,
    getCapsuleById,
    getCapsulesBycountry,
    getCapsuleByName,
    updateCapsule,
    deleteCapsule };
