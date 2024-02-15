const express = require('express');
const router = express.Router();
const People = require('./../models/People')

router.post('/',async(req,res)=>{
    try {
        const data = req.body // Assuming the person's data is in request body

    //Create a new person document using moongoose model
    const newPeople = new People(data);  
  
    //Save the newPerson into databse
    const response = await newPeople.save();
    console.log("data saved");  
    res.status(200).json(response);
    } 

    catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal server error"})
    
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

    router.put('/:id',async (req,res)=>{
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
     
    module.exports = router;