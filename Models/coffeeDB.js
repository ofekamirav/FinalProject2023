const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const capsuleSchema = new  mongoose.Schema({
    Country: {
      type: String,
      required: true,
    },
      Name: {
          type: String,
           required: true,
      },
      Type: {// Arabica or Robusta
          type: String,
          required: true,
      },
      Intensity: { // 1-8
          type: Number,
          required: true,
      },
      Flavor: {
          type: String,
          required: true,
      },
      Price : {
          type: Number,
          require:true,
      },
      });
  
module.exports = mongoose.model('capsule', capsuleSchema);

