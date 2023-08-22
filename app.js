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
app.get('/test',(req,res)=>{
  res.render('test',{})
  
})



//Creating Route for login page
const LoginRouter = require('./routes/login');
//Activate Route for log in page
app.use('/login',LoginRouter);


//Creating a route for all products page  : shop page 
app.use('/shop',require('./routes/coffeeR'));

//Creating a route to a specific Capsule page:
app.use('/capsule',require('./routes/coffeeR'))


//Creating a route to the Admins page page:
app.use('/admin',require('./routes/admin'))






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


//search 

function yourSearchLogic(query, capsules) {
  const filteredCapsules = capsules.filter(capsule => {
      return (
          capsule['_id'].toLowerCase().includes(query.toLowerCase()) ||
          capsule.origin.toLowerCase().includes(query.toLowerCase()) ||
          capsule.flavor.toLowerCase().includes(query.toLowerCase())
      );
  });

  return filteredCapsules;
}

app.get('/search', async (req, res) => {
  const searchQuery = req.query.q; // Get the search query from the URL parameter

  try {
      // Call your function to fetch all coffee capsules
      const capsules = await getAllCoffee();

      // Call your search logic function to filter capsules
      const filteredCapsules = yourSearchLogic(searchQuery, capsules);

      // Render the searchresults.ejs template with the search results
      res.render('searchresults', { capsules: filteredCapsules }); // Pass the filtered capsules to the template
  } catch (error) {
      console.error("Error fetching coffee capsules:", error);
      // Handle the error and send an error response if necessary
      res.status(500).send("Internal Server Error");
  }
});


//Setting the Port using the env file ( in gitignore)
app.listen(process.env.PORT, ()=>{
    console.log('Server Running')
});
