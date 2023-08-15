const coffeeService = require('../services/coffeeService');
const coffeeDB = require ('../Models/coffeeDB');

const addCapsule = async (req,res) =>
{
    const newCapsula = await coffeeService.addCapsule (req.body, res.json (newCapsula))
}