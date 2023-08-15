const express = require('express');
var router = express.Router();
const capsuleController = require('../Controllers/coffeeController');

router.route('/')
    //.get(coffeeController.getCapsule)
    .post(coffeeController.newCapsula);

// router.route('/:id')
    //.get(coffeeController.getCapsule)
   // .patch(coffeeController.updatePrice)
   // .delete(coffeeController.deletedCapsule);

module.exports = router;