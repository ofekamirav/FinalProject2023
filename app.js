const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const flash = require('express-flash')
const session = require('express-session');
require("dotenv").config();

//Defining Middleware functions:
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : false}));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(flash());




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



//Setting the Session to handle the login sessions
 
// app.use(session({
//     secret: 'home',    
//     saveUninitialized: true,
//     resave: true
// }))
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using HTTPS
}));

 



// app.get('*',function(res,req,next){
//   res.locals.user=req.user || null;
// })


//---------------Routings:---------------//


// Setting the route for the home page after server start
app.use("/", require("./routes/login"));



//Creating Route for login page
const LoginRouter = require('./routes/login');
//Activate Route for log in page
app.use('/login',LoginRouter);


//Creating a route for all products page  : shop page 
app.use('/shop',require('./routes/coffeeR'));

//Creating a route to a specific Capsule page:
app.use('/capsule',require('./routes/coffeeR'))




//Setting Cookies session - NEEDS TO DECIDE IF TO KEEP OR NOT 

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



//Setting the Port using the env file ( in gitignore)
app.listen(process.env.PORT, ()=>{
    console.log('Server Running')
})