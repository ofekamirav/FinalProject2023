const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const flash = require('express-flash')
const session = require('express-session');
var Onlines = 0;
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



app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(function(req, res, next) {
  if (req.session.username) {
    req.user = { 
      _id:req.session.userId,
      username: req.session.username,
      permission: req.session.permission,
      fName:req.session.fName,
      cart: req.session.cart
    };
  }
  next();
});



app.get('*',function(req,res,next){
  if (req.user) {
    res.locals.user = req.user;
  } else {
    res.locals.user = null;
  }
  next();
})


//---------------Routings:---------------//


// Setting the route for the home page after server start
app.use("/", require("./routes/Users"));


//Setting a route for a testing page
app.get('/test',(req,res)=>{
  res.render('test',{})
  
})


//Creating Route for login page
const LoginRouter = require('./routes/Users');
//Activate Route for log in page
app.use('/login',LoginRouter);


//Creating a route for all products page  : shop page 
app.use('/shop',require('./routes/coffeeR'));

//Organized
//Creating a route to the Admins page page:
app.use('/admin',require('./routes/admin'))

//Creating a route to the about page page:
app.use('/about',require('./routes/about'))


//Creating the route for cart page:
app.use('/cart',require('./routes/cart'))


//Creating the route for order functions:
app.use('/order',require('./routes/order'))


//creating a route for myUser page:
app.use('/myUser',require('./routes/myUser'))


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

app.use('/public', express.static('public'));




//Setting the Port using the env file ( in gitignore)
 const server =app.listen(process.env.PORT, ()=>{
    console.log('Server Running')
});



// socket usage
const io = require('socket.io')(server, {
  cors: { origin: "*" }
});
io.on('connection', async function(socket){

  Onlines++;
  socket.on('login', function(data){
    // saving userId to object with socket ID
  });
  io.emit('usercnt',Onlines);
  socket.on('disconnect', function(){
    Onlines--;
    io.emit('usercnt',Onlines);

  });
});


