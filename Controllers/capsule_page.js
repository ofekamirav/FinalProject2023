const mongoose = require('mongoose');
const capsulaSchema = require('./path/to/Schema'); // change path
const PersonModel = require('./path/to/Model'); // change path

const capsulaSchema = new mongoose.Schema({
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

  const capsulaModel = mongoose.model('capsula', capsulaSchema);
module.exports = capsulaModel;


import mongoose from 'mongoose';
const { Schema } = mongoose;
  

async function main() { // maybe should be func
// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to the database');
  const newCapsula = new capsulaModel({});

    // Save the new capsule to the collection
    newCapsula.save()
      .then((savedCapsule) => {
        console.log('Saved capsule:', savedCapsule);

        capsulaModel.find()
        .then((capsulas) => {
          console.log('All capsulas:', capsulas);
          
          // Update price
          capsulaModel.updateOne({ _id: savedCapsule._id }, { Price: 0 })
            .then(() => {
              console.log('Price updated successfully');
              
              // Delete a capsule from the collection
              capsulaModel.deleteOne({ _id: savedCapsule._id })
                .then(() => {
                  console.log('Capsule deleted successfully');
                  mongoose.connection.close();// Close the connection to the database
                })
                .catch((error) => {
                  console.error('Error deleting capsule:', error);
                });
            })
            .catch((error) => {
              console.error('Error updating price:', error);
            });
        })
        .catch((error) => {
          console.error('Error querying capsules:', error);
        });
    })
    .catch((error) => {
      console.error('Error saving capsule:', error);
    });
})
.catch((error) => {
  console.error('Database connection error:', error);
});}