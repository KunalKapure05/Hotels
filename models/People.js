const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    age:{
        type:Number
    },


    work:{
        type:String,
        enum :['chef','waiter','manager'],
        required:true

    },

    mobile:{
        type:Number,
        required:true
    },
    
})

const People = mongoose.model('People',peopleSchema);
module.exports = People;