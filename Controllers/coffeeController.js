const coffeeService = require('../services/coffeeService');
const coffeeDB = require ('../Models/coffeeDB');

async function main()
 { 
  const newCapsula = coffeeService.createCapsule({});
  const updatePrice= coffeeService.updateOne({ _id: savedCapsule._id }, { Price: 0 });
  const deletedCapsule= coffeeService.deleteCapsule({ _id: savedCapsule._id });
 }
