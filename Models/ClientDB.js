const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClientDataSchema = new  mongoose.Schema({
    FirstName: {
      type: String,
      required: true,
    },
      LastName: {
          type: String,
           required: true,
      },
      Email: {
          type: String,
          required: true,
      },
      username: { 
          type: String,
          required: true,
      },
      Birthdate: {
          type: String,
          required: true,
      },
      Phone : {
          type: Number,
          require:true,
      },
      Country: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    ZipCode: {
        type: Number,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
      });
  
module.exports = mongoose.model('ClientDB', ClientDataSchema);

