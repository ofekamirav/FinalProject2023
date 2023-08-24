
const loginService = require("../services/Users")

//Controller to logging in
function isLoggedIn(req, res, next) {
  // if (req.session.username != null)
  //   return next()
  // else{
  //   req.session.username=null
  //   res.render("home",{username:req.session.username})
  // }
  if(res.locals.user)
  next();
  else
  res.render('home');
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
    req.session.username = result._id;
    req.session.fName=result.firstName;
    req.session.permission= result.permission
    req.session.cart=result.cart
    console.log(req.session.username +' Has Logged In');
    res.redirect('/')
  }
  else
    res.redirect('/login?error=1')
}

async function register(req, res) {
  const { username, password,firstName,lastName,country,adress,postalcode } = req.body


  try {
    await loginService.register(username, password,firstName,lastName,country,adress,postalcode)
    res.redirect('/login');
  }
  catch (e) { 
    res.redirect('/register?error=1')
  }    
}

//  async function register(req, res) {
//   const { username, password } = req.body;

//   try {
//     await loginService.register(username, password);
//     res.json({ success: true, message: 'Successfully Created Your Account' });
//     res.render('/login',{json:res.json})
//   } catch (e) {
//     res.status(400).json({ success: false, message: 'Registration failed. Please try again.' });
//   }
// }



const getUsers = async (req , res) =>{
  const Users = await loginService.getUsers()
  res.render('allUsers',{users:Users})
}

exports.getCartItems = async (req, res) => {
  try {
    const username = req.user._id; // Assuming the username is stored in req.user
    const cartItems = await userService.getUserCartItems(username);
    res.json(cartItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
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
