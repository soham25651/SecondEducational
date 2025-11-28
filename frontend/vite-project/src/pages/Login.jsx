
// import './App.css'
// import "../styles/login.css"
// export default function  Login() {
//     return(
//          <>
//             <div className='authcontainer'>
//                      <div className='loginCard'>
                     
//                              <input type="text" className='Username input' placeholder='Username'/>  
//                              <input type="text" className='emailId input' placeholder='email Id'  />
//                               <input type="password" className='password input' placeholder='Password'  />
//                      </div>
//             </div>
         
//          </>
//     )
// }

import { useNavigate , useLocation} from "react-router-dom";  
import React, { useState } from "react";
import { motion, AnimatePresence, styleEffect } from "framer-motion";
import "/styles/login.css";
//import { signin , signup } from "../../../backend/src/controllers/user.controller";
import { AuthContext } from "../context/AuthContext.jsx";


export default function Login() {
  const router = useNavigate();

  const [formState , setForm] = React.useState(0);
  const [username , setUsername] = React.useState("");
  const [email , setEmail] = React.useState("");
  const [password , setPassword] = React.useState("");
  const [stream , setStream] = useState("");
  const [message, setMessage] = React.useState(""); 

  const {handleSignIn , handleSignUp} = React.useContext(AuthContext);
  const location = useLocation();
      const savedState = JSON.parse(localStorage.getItem("mainPageSelection"));
          const currChapternow = savedState?.curr; 
            console.log(currChapternow);  
  const handleAuth  = async(currChapternow)=>{
          //  if(currentformState === 0){     //means click on signin
          //      let result = 
          //  }
        
try {
     if (formState===0) {
            let result = await handleSignIn(username , password , currChapternow);
            setUsername("");
            setPassword("");
            
          }
          if(formState===1){
                let result = await handleSignUp(username , email , password);

                setUsername("");
                setPassword("");
                setMessage(result);
                setForm(0);
          }
} catch (error) {
  console.error(error);
  return error;
}
       
  }
  return (
    
    <div className="authcontainer">
      <motion.div
        className="loginCard"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
  
<p>{message}</p>
        {/* Animated Input Section */}

     

        
        <AnimatePresence mode="wait">
          <motion.div
            // key={role}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="inputContainer"
          >


              <div className="authbtn">

        <motion.button
            style={{backgroundColor:formState==0 ? "#7434dc" : "white" , color: formState == 0 ? "white" : "#7434dc"}}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="submitBtn"
          onClick={
              ()=>{
                setForm(0);
               
                
              }}
        >
          sign In
        </motion.button>
         <motion.button
         style={{backgroundColor:formState==1 ? "#7434dc" : "white" , color: formState == 1 ? "white" : "#7434dc"}}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="submitBtn"
          onClick={
            ()=>{
              setForm(1);
             
            }
            }
        >
          sign Up
        </motion.button>
      </div>
     



            <input 
               type="text" 
               className="input" 
               placeholder="Username" 
               value={username}
               onChange={(e)=>setUsername(e.target.value)} />

            {formState === 1 ?   
            <input 
                 type="email" 
                 className="input" 
                 placeholder="Email ID" 
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 />

                : <></>}

            <input 
                  type="password" 
                  className="input" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  />
              
               
           
        

          <motion.div>
                <button className="submitButton" onClick={()=> handleAuth(currChapternow)}>Submit</button>

          </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Submit Button */}
       
         
        
      </motion.div>
    </div>
  );
}
