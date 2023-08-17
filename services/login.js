const User = require('../models/Users')

async function login(username, password) {
    const user = await User.findOne({ _id: username, password });
    return user
}

async function register(username, password) {

    var permission
    if(username=='avivportal')
    {
        permission=1;
    }
    else{
        permission =0;
    }

    const user = new User({
        _id: username,
        password:password,
        permission:permission
        
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