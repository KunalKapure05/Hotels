const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) => {

    //Extract the jwt token from request header
    const token = req.headers.authorization.split('')[1];
    if(!token) return res.status(401).json({error:"Unauthorized"})

    try {

        //Verify the token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        //attach the user info to request object
        req.user = decoded;
        next();

        
    } catch (error) {
        console.error(error)
        res.status(401).json({error:"Invalid token!"})
        
    }
}

//Function to generate token
const generateToken = (userData)=>{
    //Generate a new jwt token using user data
    return jwt.sign(userData,process.env.JWT_SECRET)
}

module.exports={jwtAuthMiddleware,generateToken};