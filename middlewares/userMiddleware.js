const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



function authenticateUser(req, res, next) {
	const token=req.header('auth-token');
if(!token)
{
   return res.status(401).json({Error:"Access is denied"});
}
try{
    const verified=jwt.verify(token,process.env.TOKEN_SECRET);
    req.user=verified;
    next();
}
catch(err){
    res.status(400).json({Error:"Invalid token"});
}

}

module.exports=authenticateUser