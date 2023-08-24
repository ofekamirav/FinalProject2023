const mongoose = require("mongoose");

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
    type:[{
      itemId:{
        //type: mongoose.Schema.Types.ObjectId,
        type:String,
        ref:'products',
        required:true
      },
      quantity:{
        type:Number,
        required:true
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

