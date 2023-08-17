// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const app = express();
// const port = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost:27017/ClientDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String
// });

// const User = mongoose.model('User', userSchema);

// app.use(express.json());

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Validate input
//   if (!email || !password) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server started on http://localhost:${port}`);
// });

const loginService = require("../services/login")

function isLoggedIn(req, res, next) {
  if (req.session.username != null)
    return next()
  else{
    req.session.username=null
    res.render("home",{username:req.session.username})
  }
}

function logedIn(req, res) {  
  res.render("home", {username: req.session.username,permission:req.session.permission})
}

function loginForm(req, res) { res.render("login", {}) }

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
  const { username, password } = req.body


  try {
    await loginService.register(username, password)    
    res.redirect('/login')
    
  }
  catch (e) { 
    res.redirect('/register?error=1')
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
