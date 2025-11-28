import {  Link  , useNavigate , useLocation } from "react-router-dom";

import React, { useEffect, useState } from "react";
import logo from "./allphoto/computer-science (1).png";
import "./navbar.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function Navbar({newDataone}) {
 // console.log(backData); 
    const location = useLocation();
  const currentPath = location.pathname;
 const navigate = useNavigate();
 const [hereSet , setHere] = useState(null);
 const raw = localStorage.getItem("navbarData");
const saved = raw ? JSON.parse(raw) : null;

const [storedData, setStoredData] = useState(saved?.backRouteData || null);

useEffect(() => {
  if (newDataone !== null && newDataone !== undefined) {
    setStoredData(newDataone);
console.log(newDataone+" Navbar new Data on ");
    // only create/update storage when valid newDataone arrives
    localStorage.setItem(
      "navbarData",
      JSON.stringify({
        backRouteData: newDataone
      })
    );
  }
}, [newDataone]);


console.log(newDataone+"newDAta one ");

  // const incomingState = location.state;
  //   const savedState = JSON.parse(localStorage.getItem("mainPageSelection"));

  //     const subTopic = newsubTopic||incomingState?.subTopic || savedState?.subTopic || null;
  // const topicTitle = newtopicTitle||incomingState?.topicTitle || savedState?.topicTitle || null;
  //   const backRoute = backData||incomingState?.backRoute || savedState?.backRoute ;
  // const keyName = newkeyName||incomingState?.newName||null;// newdata.title|| 
  //    const newTitle = incomingState?.Titlesone || savedState?.Titlesone ;
  //      const openaChapterfterback = newcurrChapter||incomingState?.currOpenChap|| savedState?.currOpenChap ;
    //    console.log(newTitle+" newTitlr");
    //    console.log(openaChapterfterback+" after chap back");
    //    console.log(subTopic+" subTopic");//"HTML CSS"
    //     console.log(topicTitle+" topicTitle");//WebDevlopment

    //     console.log(backRoute+"backRoute");//Coding
    //     console.log(keyName+"keyNamr");//Coding

    //    useEffect(() => {
    //   if (!keyName && !newTitle && !openaChapterfterback && !backRoute && !subTopic && !topicTitle ) {
    //     console.warn("❗ keyName is missing from location.state");
    //   }
    // }, [keyName , newTitle , openaChapterfterback , backRoute , subTopic , topicTitle ])

      
  const handleroute = (newDataone)=>{
    //  if (currentPath=== "/HTML-CSS") {
    //    const yes =  location.state?.Titles;
    //      navigate("/coding" , {state : {Titles : yes}});
    //  }else if (currentPath === "/coding" ) {
    //    navigate("/mainpage");
    //  }else if (currentPath === "/AllRoute") {
    //     const yes =  location.state?.Titles;
    //    navigate("/coding", {state : {Titles : yes}});
    //  }else{
    //   navigate(-1);
    //  }
      const allsaved = JSON.parse(localStorage.getItem("mainPageSelection")) || null;  
     // console.log(allsaved?.title);
  const ans =  allsaved?.storedTitleCopy;
console.log(hereSet+" new Date on in nav ");
    const routeMap = {
      "/mainpage":{path : "/"},
      "/coding": { path: "/mainpage" },//Titlesone: newTitle  , currOpenChap : openaChapterfterback , newkeyNameInNextcomp : keyName   ,
      "/AllRoute": { path: "/coding"},//, state:{newkeyNameprob : hereSet}
    };
      const target = routeMap[currentPath];// 
    if (target) navigate(target.path,{ state: target.state  });
    else navigate(-1); // fallback to previous page
  }

  const navbarClassMap ={
      "/": "navbar-main",
  "/mainpage": "navbar-mainpage"
  };

  const navbarClass = navbarClassMap[currentPath] || "navbar"; 


     return(
     <>



     <nav style={{width:'100%' , height:'2rem'}} className={navbarClass}>
      
            <header style={{ display: "flex", alignItems: "center", padding: "10px" }}>
             {/* Logo on the left */}
             <div className="logodiv">
                <img 
             className="logo"
               src={logo} 
               alt="Logo" 
              
             />
                <p>EducationalHub</p>
           
            
             </div>
            
       
       
              </header>
      
         
         {currentPath !== '/' ?       
          <a  onClick={()=>handleroute(newDataone)} 
             className="backpage">

                   {<ArrowBackIcon />}
              
                  
                   
                   </a> : <></>}
     </nav>
     </>

     )
}  
