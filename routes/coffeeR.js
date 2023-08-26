const express = require('express');
var router = express.Router();
const capsuleController = require('../controllers/coffeeC');


    router.route('/').get(capsuleController.getCapsules)
    router.route('/capsule').get(capsuleController.getCapsule)
    router.route('/').post(capsuleController.sortProducts)
    router.post('/search',capsuleController.searchCapsule)





   


module.exports = router;