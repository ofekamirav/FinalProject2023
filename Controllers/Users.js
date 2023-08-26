
const loginService = require("../services/Users")

//Controller to logging in
function isLoggedIn(req, res, next) {
  if (req.session.username != null)
    return next()
  else{
    req.session.username=null
    res.render("home",{username:req.session.username})
  }
}

//Controller to send to home page after logging in 
function logedIn(req, res) {  
  res.render('home',{})
}


//Controller for login - getRoute
function loginForm(req, res) { 
  res.render("login", {messages:req.flash('success')[0]});
}



  //Controller for register - getRoute
function registerForm(req, res) { res.render("register", {}) }



function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
}

async function login(req, res) {
  const { username, password } = req.body

  const result = await loginService.login(username, password)
  if (result) {
    req.session.userId = result._id;
    req.session.username=result.email;
    req.session.fName=result.firstName;
    req.session.permission= result.permission
    req.session.cart=result.cart
    console.log(req.session.username +' Has Logged In');
    res.redirect('/')
  }
  else
    res.redirect('/login?error=1')
}


//Creating a new User using the register page
async function register(req, res) {
  try {
  const { email, password,firstName,lastName,country,address,postalcode } = req.body
  const result = await usersService.register(email, password,firstName,lastName,country,address,postalcode)

    if(result.success)
    res.json(result)
  else
  res.status(400).json(result)
  }
  catch (e) { 
    res.status(500).json({ success: false, message: 'An error occurred while creating the user' });
  }    
}


const getUsers = async (req , res) =>{
  const Users = await loginService.getUsers()
  res.render('allUsers',{users:Users})
}




module.exports = {
  login,
  loginForm,
  register,
  registerForm,
  logout,
  logedIn,
  isLoggedIn,
  getUsers
}
