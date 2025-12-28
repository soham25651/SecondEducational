
import {jwtDecode} from "jwt-decode";
import React, { useEffect, useState , useContext } from "react";
import { useNavigate  , useLocation} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import Navbar from "../../navbar.jsx"
import HTMLDATA from "../../DBs.json"

import "./Coding.css";
import allRoutes from "../../allRoutes.json"


export default function Alltoproute() {
   
       const location = useLocation();
         const navigate = useNavigate();
           const { user } = useContext(AuthContext);
    const [theData , setTheData] = useState(null);
           //  const subTopics = location.state?.Titles; 
    //  console.log(subTopics); 
   // const [keyValue , setKey] = useState(null);
     // const keyName = location.state?.newkeyNameInNextcomp||location.state?.Titles || location.state?.Titlesone ||null; 
     const saved = JSON.parse(localStorage.getItem("mainPageSelection")) || null;  
    const newsaved = JSON.parse(localStorage.getItem("navbarData"));  
const datapre = location.state?.preData;
      // const [keyName , setKeyName] = useState(saved?.title || null);
  // const saved = JSON.parse(localStorage.getItem("mainPageSelection"));
  // console.log(saved);
 //const keyName = saved?.title;
 const newnameKey = location.state?.newkeyNameprob;
console.log(newnameKey +" in coding");
 useEffect(()=>{
  if (!newnameKey && !datapre) {
    console.log("no preRoute data");
  }
 } , [newnameKey , datapre])


  const keyName = datapre ||newsaved?.backRouteData||saved?.title || saved?.newName||null;
  console.log(newsaved?.backRouteDatas+" new back data");
  const sendData = saved?.title;
  console.log(sendData);
 useEffect(()=>{
  if (sendData) {
    setTheData(sendData);
  }
 },[])

// useEffect(() => {
//   console.log("UPDATED keyName =", keyName);
// }, [keyName]);
//  console.log(saved);
//  console.log(saved?.title);
// console.log(keyName);

    // const currOpenChaps = location.state?.currOpenChap;
   
  //     const selected = location.state?.selected;
  //  //  console.log(keyValue);
  //    console.log(keyName+" now");
  //        console.log(currOpenChap);
  const indexMap = {};

for (const obj of HTMLDATA) {
  for (const key of Object.keys(obj)) {
    indexMap[key] = obj;
  }
}

   //  const foundObject = HTMLDATA.find(obj => obj.hasOwnProperty(keyName));
    const foundObject = indexMap[keyName];

   
   // console.log(foundObject[keyName]);
      // useEffect(()=>{
      //   if(keyName!==null){
      //      setKey(keyName);
      //   }
       
      // }, [keyName])


 
  //     useEffect(() => {
  //   if (!currOpenChaps) {
  //     console.warn("❗ curr cha is missing from location.state");
  //   }
  // }, [currOpenChaps])

      const topics = foundObject ? foundObject[keyName] : [];



           console.log(topics);
const [val , setVal]= React.useState(topics);

 
  const [activeTopic, setActiveTopic] = useState(topics[0] || null ); // ✅ Default first topic
 const [currOpenChap , setCurrChap] = useState(null);
   
     //  useEffect(() => {
//   if (topics.length > 0) {
//     setActiveTopic(topics[0]);
//   }
// }, [topics]);
  // useEffect(() => {
  //   if (Array.isArray(topics) && topics.length > 0) setActiveTopic(topics[0]);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [JSON.stringify(topics)]); // stringify so dependency notices changes



    
 
  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
       const toSave = {
      ...saved,
      topicTitle: topic.title,
    };

    localStorage.setItem("mainPageSelection", JSON.stringify(toSave));
  };

//   const handleSubTopicClick = (sub) => {
 
//                      setCurrChap(sub);
// console.log(sub+" Sub ");
// console.log(activeTopic.title+"Active Title ");
//   // console.log(location.state?.Titles+" state Titles ");
//    console.log(keyName+"keyName in Coding");
//    console.log(currOpenChap+" currOpenChap ");
//    localStorage.setItem("mainPageSelection", JSON.stringify({
//       subTopic:sub,//HTML/CSS
//       topicTitle:activeTopic.title,//Web
//       CodingpageRoute:location.pathname,
//       newName:keyName }));//coding 
//     navigate("/AllRoute", { 

      
   
//   });


    // state: { subTopic: sub, topicTitle: activeTopic.title , backRoute: location.pathname ,newName : keyName , curr : currOpenChap} 
 //state: { subTopic: sub, topicTitle: activeTopic.title , backRoute: location.pathname ,newName : keyName , curr : currOpenChap} 
 
//     const handleSubTopicClick = (sub) => {
     
//           setTheData(sendData);
      
//     setCurrChap(sub);


// //     if (!user) {
// //       navigate("/login");
      
// //     }else{
// //    const toSave = {
// //       ...JSON.parse(localStorage.getItem("mainPageSelection") || "{}"),
// //       subTopic: sub, // e.g., "HTML/CSS"
// //       topicTitle: activeTopic?.title || null,
// //       CodingpageRoute: location.pathname,
// //       newName: keyName,
// //       foundedData: foundObject ? foundObject[keyName] : null,
  
// //     };
// //  localStorage.setItem("mainPageSelection", JSON.stringify(toSave));

// //     // navigate to AllRoute which will read from localStorage
// //     navigate("/AllRoute");
// //     }
//  const token = localStorage.getItem("token"); // or from cookies
//   if (!token) {
//     navigate("/login");
//     return;
//   }



//     // Save canonical selection so AllRoutes can read it
    

   
// };


const handleSubTopicClick = (sub) => {
  setTheData(sendData);
  setCurrChap(sub);

  // 1) Read auth data from localStorage
  //const auth = JSON.parse(localStorage.getItem("authData"));

  // IF no auth → send to login
  // if (!auth || !auth.token || !auth.accessExpiry) {
  //   return navigate("/login");
  // }


  // 2) Check access expiry (7 days rule)
  // // 2) Check access expiry (7 days rule)

  // const now = new Date();
  // const expiry = new Date(auth.accessExpiry);

  // // If expired → go to login
  // if (now > expiry) {
  //   localStorage.removeItem("authData");
  //   return navigate("/login");
  // }

  // 3) User is authenticated & inside 7 days → store page data
  const toSave = {
    ...JSON.parse(localStorage.getItem("mainPageSelection") || "{}"),
    subTopic: sub,
    topicTitle: activeTopic?.title || null,
    CodingpageRoute: location.pathname,
    newName: keyName,
    foundedData: foundObject ? foundObject[keyName] : null,
  };

  localStorage.setItem("mainPageSelection", JSON.stringify(toSave));

  // 4) Navigate to next page
  navigate("/AllRoute");
};



  return (
    <>
    <Navbar newDataone={theData}/>
      <div className="coding-layout" style={{paddingTop:'3rem'}}>

      {/* LEFT PANEL */}

      <div className="left-panel">
        {topics.map((topic) => (
          <button
            key={topic.id}
            style={{textAlign:'center'}}
            className={`topic-btn ${activeTopic.id === topic.id ? "active" : ""}`}
            onClick={() => handleTopicClick(topic )}
          >
            {topic.title}
          </button>
        ))}
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <h2 className="right-title">{activeTopic.title}</h2>

        <div className="subtopic-container">
          {activeTopic.subtopics.map((sub, index) => (
            <button
              key={index}
              className="subtopic-btn"
              onClick={() => handleSubTopicClick(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

    </div>
    </>
  
  );
}


