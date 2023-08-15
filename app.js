const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require("dotenv").config();


//Connecting to the DB 
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Mongoose connected");  
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB:", error);
  });

  var app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());


const session = require('express-session');
app.use(session({
    secret: 'home',    
    saveUninitialized: true,
    resave: false
}))
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));  
app.use("/", require("./routes/login"));


//---------------Routings:---------------//

//Creating Route for login page
const LoginRouter = require('./routes/login');
//Activate Route for log in page
app.use('/login',LoginRouter);


// //Creating Route for Sign Up page
// const SignUpRouter = require('./routes/signup');
// //Activate Route for sign up page
// app.use('/signup',SignUpRouter);



// app.get('/', (req, res) => {
//   const username = req.cookies.username;
//   const permission = req.cookies.Permission;
//   console.log(username);
//   if (username) {
//       console.log(username);
//     res.render('home', { naming: username,permission:permission });
//   } else {
//     res.render('home', { naming: 'Guest' ,permission:0 });
//   }
// });


app.listen(process.env.PORT, ()=>{
    console.log('Server Running')
})