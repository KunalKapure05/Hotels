const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define the person schema
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

    username:{
        type:String,
       
        required:true,
       
    },

    password:{
        type:String,
        required:true,    
    }

    
})

peopleSchema.pre('save',async function(next){
    const person = this;

    //hash the passsword only if it is been modified or is new
    if(!person.isModified('password'))return next();

    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);

        //overide the plain password with the hashed one
        person.password = hashedPassword;
        next();


        
    } catch (error) {
        return next('error');
        
    }
})

peopleSchema.methods.comparePassword =  async function(candidatePassword){
    try {
            // Use the bcrypt to compare the provided password with the hashed password
            const isMatch = await bcrypt.compare(candidatePassword,this.password)
            return isMatch;
        
    } catch (error) {
        throw error;
        
    }
} 



const People = mongoose.model('People',peopleSchema);
module.exports = People;