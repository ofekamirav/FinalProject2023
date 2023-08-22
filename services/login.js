const User = require('../models/Users')

async function login(username, password) {
    const user = await User.findOne({ _id: username, password });
    return user
}

async function register(username, password,firstName,lastName,Country,Adress,postalCode) {

  

    const user = new User({
        _id: username,
        password:password,
        firstName:firstName,
        lastName:lastName,
        Country:Country,
        Adress:Adress,
        postalCode:postalCode,
        permission:0
        
    });

    await user.save()        
}

async function getUsers(){
    return await User.find({})
}

async function deleteU(userId)  {
    try {
      const result = await User.findByIdAndRemove(userId);
      console.log(userId)
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