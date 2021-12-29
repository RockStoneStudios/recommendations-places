const User = require('../Models/User');
const {EncryptPassword,PasswordCompare} = require('../Utils/EncriptPassword');
const {GenerateToken} = require('../Utils/GenerateToken');

const Register = async(req,res)=>{
      const passwordEncrypt = await EncryptPassword(req.body.password);
      const newUser = new User({
          username : req.body.username,
          email : req.body.email,
          password : passwordEncrypt
      });
       try {
        const user = await newUser.save();
         if(user) return res.status(200).json(user._id);
       } catch(error){
           res.status(500).json(error);
       }

}


const Login = async(req,res)=>{
     const {username, password} = req.body;
      try {
        const userExist = await User.findOne({username: username});
        if(userExist){
           if(await PasswordCompare(password,userExist.password)){
                
                res.status(200).json({ _id: userExist._id, username: userExist.username });
           } else {

               res.status(400).json({message : "Password don't match"})
           }
           
        } else {

            res.status(400).json({message : "No user found with this email"})
        }
        
      }catch(error){
          res.status(500).json(error);
      }
}


module.exports = {
    Register,
    Login
}