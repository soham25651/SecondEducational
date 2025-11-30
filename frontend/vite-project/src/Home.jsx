// import { Link, useNavigate } from 'react-router-dom'
// import './App.css'

import logo from "./allphoto/logo.png.png";
// export default function Home(){
//      let router = useNavigate();
//    return(
//     <>
//     <div className="fullHomePage">

         
         

//      <button className='homebtn' onClick={()=>{router("/login")}}>Get started</button>
      
                      
   
//     </div>
    
//     </>
//    )
  
//  }


import { color, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import "./Home.css"
// import "../styles/home.css";

export default function Home() {
  const router = useNavigate();

  return (

    
    <div className="fullHomePage">
       <Navbar style={{color:'red'}}/>
      {/* 🔹 Background Video */}
      <video autoPlay loop muted playsInline className="bgVideo">

       
        <source src="/bgrrr.mp4" type="video/mp4" />
      </video>

      {/* 🔹 Overlay (dark blur for text visibility) */}
      <div className="overlay"></div>

   

 
       <motion.h3  
      
        className="logoto"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        >
         Provide stuctured roadmap for your Goal
      
          </motion.h3> 
      {/* 🔹 Heading */}
      {/* <motion.h1
        className="mainHeading"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
      >
    Connect, Share, and Learn in Your Domain
      </motion.h1> */}
    

      {/* 🔹 Sub-heading */}
      
      <motion.p
        className="subText"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
      >
       Easy Roadmaps to Help You Succeed
      </motion.p>

      {/* 🔹 Animated Button */}
      <motion.button
        className="homebtn"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 30px rgba(255,255,255,0.8)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router("/mainpage")}
      >
        Get Started
      </motion.button>
    </div>
  );
}
