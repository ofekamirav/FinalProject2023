
const loginService = require("../services/login")

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
  res.render("home", {username: req.session.username,permission:req.session.permission})
}


//Controller for login - getRoute
function loginForm(req, res) { 
  console.log(req.flash());
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
    req.session.username = username
    req.session.permission= result.permission
    
    res.redirect('/')
  }
  else
    res.redirect('/login?error=1')
}

async function register(req, res) {
  const { username, password,firstName,lastName,country,adress,postalcode } = req.body


  try {
    await loginService.register(username, password,firstName,lastName,country,adress,postalcode)

    req.flash("success","Account Created");
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
