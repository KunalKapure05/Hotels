const express = require('express'); 
const app = express();
const db = require('./db');


const passport = require('./middlewares/auth')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// const People = require('./models/People'); ---> It is kept in auth.js file 
require('dotenv').config();
const PORT = process.env.PORT || 8100;



//Middleware fn
const logRequest = (req,res,next)=>{
    console.log(`${new Date().toLocaleString()} request made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}

app.use(logRequest);

app.use(passport.initialize());




const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get('/', (req,res)=>{
    res.send("welcome to our hotel")
})


  //Import the router files
    const personRoutes = require('./Routes/personRoutes');
    app.use('/person',personRoutes)


    const MenuItemRoutes = require('./Routes/menuItemRoutes');
    app.use('/menu',MenuItemRoutes)



    




app.listen(PORT,()=>{
    console.log("Listening to port no : 8100");
})
