const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const capsule = new mongoose.Schema({
    Name:{
        type:String,
        unique:true,
        required:true,
    },

    origin:{
        type:String,
        
    },

    type:{
        type:String,
        
    },

    intensity:{
        type:String,
        
    },

    flavor:
    {
        type:String,
    },

    price:
    {
        type:Number,
    },
    image:
    {
        type:String,
        default:""
        
    },
    dateAdded:{
        type:Date,
        default:Date.now
    }




      });

module.exports = mongoose.model('products', capsule);