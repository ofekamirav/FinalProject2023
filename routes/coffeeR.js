const express = require('express');
var router = express.Router();
const capsuleController = require('../controllers/coffeeC');


router.route('/')
    .get(capsuleController.getCapsules)
    //.post(coffeeController.newCapsula);


    router.route('/capsule').get(capsuleController.getCapsule)

    router.post('/search',capsuleController.searchCapsule)




// router.route('/:id')
    //.get(coffeeController.getCapsule)
   // .patch(coffeeController.updatePrice)
   // .delete(coffeeController.deletedCapsule);
   


module.exports = router;