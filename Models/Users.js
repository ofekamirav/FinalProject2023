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
  },
  firstName:{
    type:String,
    require:true
  },
  lastName:{
    type:String,
    require:true
  },
  Country:{
    type:String,
    require:true
  },
  Address:{
    type:String,
    require:true
  },
  postalCode:{
    type:String,
    require:true
  },
  permission:{
    type:Number,
    default: 0,
  },
  cart:{
    type:Array,
    default:[],
  }
});

module.exports = mongoose.model("Users", User);

