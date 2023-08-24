const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email:{
    type:String,
    unique:true,
    required:true

  },
  password: {
    type: String,
    required: true,
  },
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  country:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  postalCode:{
    type:String,
    required:true
  },
  permission:{
    type:Number,
    default: 0,
  },
  cart:{
    type:[{
      itemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'products',
        requiredd:true
      },
      quantity:{
        type:Number,
        requiredd:true
      }
    }],
    default:[]
  },
  dateCreated:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Users", User);

