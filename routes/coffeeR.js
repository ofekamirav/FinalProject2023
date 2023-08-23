const express = require('express');
var router = express.Router();
const capsuleController = require('../controllers/coffeeC');


router.get('/', (req, res) => {
    res.render('search'); // Assuming 'search.ejs' is in your 'views' directory
});

router.route('/')
    .get(capsuleController.getCapsules)
    //.post(coffeeController.newCapsula);

router.route('/capsule').get(capsuleController.getCapsule)

// router.route('/:id')
    //.get(coffeeController.getCapsule)
   // .patch(coffeeController.updatePrice)
   // .delete(coffeeController.deletedCapsule);
   


module.exports = router;