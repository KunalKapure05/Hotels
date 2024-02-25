const express = require('express');
const router = express.Router();
const People = require('./../models/People')
const {jwtAuthMiddleware,generateToken} = require('./../middlewares/jwtAuth')

//Post route to add person
//signup page
 router.post('/signup',async(req,res)=>{
    try {
        const data = req.body // Assuming the person's data is in request body with the help pf body-parser

    //Create a new person document using moongoose model
    const newPeople = new People(data);  
  
    //Save the newPerson into databse
    const response = await newPeople.save();
    console.log("data saved"); 

    const payload  = {
        id : response.id,
        username :response.username
    }

    console.log(JSON.stringify(payload))
    const token = generateToken(payload);
    console.log("token is : " , token)


    
    

    res.status(200).json({"response":response,"token":token});
    } 



    catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal server error"})
    
    }
    })

     //Login page
    router.post('/login',async(req,res)=>{
      try {
        //Extract the username and password from request body
        const {username,password} = req.body;

        //Find the user by username
        const user = await People.findOne({username:username});

        //If the user doesnt exist or password is wrong,return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid User or password"})

        }

        //generate token
        const payload = {
            id:user.id,
            username:user.username
        }

        const token = generateToken(payload);

        //return token as a response
            res.status(201).json({token})
        



        
      } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal Server Error"})
        
      }

    })





    router.get('/', async (req,res)=>{
        try {
            const response = await People.find();
            console.log("data fetched");
            res.status(201).json(response)
            
        } catch (error) {
            console.log(error);
            res.status(500).json({error:"Internal Server Issue"})
            
        }
    })

    router.get('/:workType', async (req,res)=>{
       try {
         const workType = req.params.workType;// extract the worktype from url parameter
         if(workType=='chef'||workType=='waiter'||workType=='manager' ){
             const response = await People.find({work:workType});
             console.log("Data fetched");
             res.status(200).json(response);
         }else{
            res.status(401).json({"error":"Invalid worktype "})
         }
       } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal Server Issue"})
        
       }
        
    })

    router.put('/:id',async (req,res)=>{  /// this is Update method
        try {
            const personId = req.params.id // extract the id from url parameter
            const updatedPersonData = req.body// updated data will be stored in req.body by body-parser

            const response = await People.findByIdAndUpdate(personId,updatedPersonData,{
                new:true, //return the updated document
                runValidators:true // run mongoose validation
            })

            if(!response){
                return res.status(404).json({error:"Person not found"});
            }
            console.log("Data updated");
            res.status(201).json(response)
            
        } catch (error) {
            console.log("Error of Server")
            res.status(500).json({error:"Internal Server Issue"})
            
        }
    })

    router.delete('/:id', async (req, res) => {
        try {
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        
        // Assuming you have a Person model
        const deletedPerson = await People.findByIdAndDelete(personId);
        if (!deletedPerson) {
        return res.status(404).json({ error: 'Person not found' });
        }
        // Send a success message as a JSON response
        console.log("Person has been deleted suucessfully")
        res.json({ message: 'Person deleted successfully' });
        } 
        
        catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
        });

     
    module.exports = router;