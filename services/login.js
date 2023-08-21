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

module.exports = {
     login, 
     register,
     getUsers
     }