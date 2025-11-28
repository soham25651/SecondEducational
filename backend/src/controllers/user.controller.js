import { User } from "../models/user.model.js";
import httpStatus from "http-status";//manipulate status by me    //npm install http-status

import bcrypt from "bcryptjs";  //npm install bcrypt
//crypto => Used to generate secure random strings, tokens, or hashes.
import crypto from "crypto";  //no need command this is node by default 

const signin = async(req , res)=>{
        
    const {username , password }  = req.body;
      if(!username ){
              return res.status(400).json({message : "Please enter username"});
        }else if(!password){
                      return res.status(400).json({message : "Please enter correct password"});
        }


     //  try {
     //      const user = await User.findOne({username});
     //   if(!user){
     //        return res.status(httpStatus.NOT_FOUND).json({message :"User not found"});
     //   }
     //          let isPassword = await bcrypt.compare(password , user.password); //means check in DBS 
     //          if (isPassword) {
     //                let token = crypto.randomBytes(20).toString("hex");
     //                     user.token = token;
     //                     await user.save();
     //                     return res.status(httpStatus.OK).json({token : token ,});
             
             
             
             
             
             
     //                } else {
     //               return res.status(httpStatus.UNAUTHORIZED).json({message : "Invalid Username or password"});
     //          }


     //  } catch (error) {
     //     return res.status(500).json({message : `Something went wrong ${error}`});
     //  }
     try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword)
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid credentials" });

    // -----------------------------------------
    // ✅ ACCESS EXPIRY LOGIC
    // -----------------------------------------
    const now = new Date();

    // User did not visit for 7+ days → access expired
    if (now > user.accessExpiry) {
      return res.status(401).json({
        message: "Access expired. Please login again."
      });
    }

    // Extend access for 7 days from NOW
    user.lastVisit = now;
    user.accessExpiry = new Date(now.getTime() + 7*24*60*60*1000);

    // Create Token
    const token = crypto.randomBytes(20).toString("hex");
    user.token = token;

    await user.save();

    return res.status(httpStatus.OK).json({
      message: "Sign in successful",
      token,
       accessExpiry: user.accessExpiry, 
      user
    });

  } catch (error) {
    return res.status(500).json({ message: `Something went wrong ${error}` });
  }
};

const signup = async(req , res)=>{
   
    const { username ,email , password } = req.body;
   if( !username || !password ){//if not fill any data by user
              return res.status(400).json({message : "Please Provide"});
          }


    try {

         const existingUser = await User.findOne({username});
           
          //if exist why we return make newUser for same existing person
        if(existingUser){
             return res.status(httpStatus.FOUND).json({message : "User already exists"});//if status is FOUND that time return message by self made like "User already exists"
           }
               const hashedPassword = await bcrypt.hash(password , 10);
    const token = crypto.randomBytes(20).toString("hex");
      const newUser = new User({
            username : username,
            email : email,
            password : hashedPassword,
          lastVisit: new Date(),
      accessExpiry: new Date(Date.now() + 7*24*60*60*1000),
          token,

      });
  
     await newUser.save();
   return res.status(httpStatus.CREATED).json({
      message: "Signup successful",
      token,
      accessExpiry: newUser.accessExpiry,
      user: {
        username: newUser.username,
        email: newUser.email,
      }
    });
          } catch (error) {

               console.error(error);
             res.status(500).json({message :`Something wrong ${error}`});
          }
  
}

export {signin , signup};