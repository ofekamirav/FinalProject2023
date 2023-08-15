const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://seceret_coffee:secer_coffee@cluster0.333dgax.mongodb.net/shop?retryWrites=true&w=majority');

const Schema = mongoose.Schema;

const capsuleSchema = new mongoose.Schema({
    Origin: {
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

module.exports = mongoose.model('Capsule', capsuleSchema);