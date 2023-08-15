const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const ClientDataSchema = new  mongoose.Schema({
//     Name: {
//       type: String,
//       required: true,
//     },
//       Email: {
//           type: String,
//           required: true,
//       },
//     Password: {
//         type: String,
//         required: true,
//     },
//       });


const User = new mongoose.Schema({
  _id: String,
  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Users", User);

