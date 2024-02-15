const express = require('express'); 
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const People = require('./models/People');
require('dotenv').config();
const PORT = process.env.PORT || 8100;

app.get('/',(req,res)=>{
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