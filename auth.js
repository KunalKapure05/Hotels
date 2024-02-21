// Sets up a Passport with a local authentication strategy,using a People model 

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const People = require('./models/People');

passport.use(new localStrategy(async function(USERNAME,password,done){
   try {
    console.log("Received Credentials : ",USERNAME,password);
    const user = await People.findOne({username:USERNAME});
    if(!user)
    return done(null,false,{message:"Invalid username"});
    // const PasswordMatch = user.password===password ? true : false;
    const PasswordMatch = await user.comparePassword(password);
    if(PasswordMatch){
        return done(null,user);
    }else{
        return done(null,false,{message:"Invalid password"})
    }

}
catch (error) {
    return done(error);
}

}))

module.exports = passport;