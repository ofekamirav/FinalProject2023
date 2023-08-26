const User = require('../models/Users')

async function login(username, password) {
    const user = await User.findOne({ email: username, password });
    return user
}

//New Register Method:
async function register(email, password,firstName,lastName,Country,Address,postalCode) {
try{
    const user = new User({
      email: email,
      password:password,
      firstName:firstName,
      lastName:lastName,
      country:Country,
      address:Address,
      postalCode:postalCode,
      permission:0
        
    });
    const newU =await user.save()
    if(newU)
      return{success:true,message:'Registrated Successfully'}
    else
    return {success:false,message:'Couldnt Register'}
    
  }catch(err){
    throw err;
  }      
}

async function getUsers(){
    return await User.find({})
}

async function deleteU(userId)  {
    try {
      const result = await User.findByIdAndRemove(userId);
      
      if (result) {
        return { success: true, message: 'User deleted successfully' };
      } else {
        return { success: false, message: 'User not found' };
      }
    } catch (err) {
      throw err;
    }
  };


 
module.exports = {
     login, 
     register,
     getUsers,
     deleteU,
     }