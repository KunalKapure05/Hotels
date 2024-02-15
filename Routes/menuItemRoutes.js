const express = require('express');
const router = express.Router();
const Menu = require('./../models/Menu');

router.post('/', async (req,res)=>{
    try {
        const menuItemData = req.body;

        const Menus = new Menu(menuItemData);

        const response = await Menus.save();
        console.log("menu items stored");
        res.status(201).json(Menus);

        
    } catch (error) {
        console.log("Error will creating menu: ",error);
        res.status(500).json({error:"Internal Server error"})
        
    }
})

//get method to get all saved menu items from databse
router.get('/', async(req,res)=>{
    try{
        const response = await Menu.find()
        console.log("Here is your menu");
        res.status(200).json(response)
    }
    catch(err){
        console.log("couldnt get menu : " , err);
        res.status(500).json({error:"Internal Server error"})
    }

} )

module.exports = router;

//Comment added for testing purposes

