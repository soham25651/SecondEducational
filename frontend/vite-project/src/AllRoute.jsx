import ReactPlayer from 'react-player';


import React, { useState  , useEffect , useRef , useContext } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

//import '../src/subPages/coding/subpages/HTMLCSS/HTMLpage.css';
import "../src/AllRoute.css"
import Navbar from '../src/navbar';
import { Navigate, useLocation , useNavigate } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext.jsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import chapters from "./data.json"
import HTMLDATA from "../src/DBs.json"
const AllRoutes = () => {

    const location = useLocation();
const navigate = useNavigate();
  const incomingState = location.state;
  const savedState = JSON.parse(localStorage.getItem("mainPageSelection") || "null");
  const subTopic = savedState?.subTopic || incomingState?.subTopic || null;
  const topicTitle = savedState?.topicTitle || incomingState?.topicTitle || null;
  const keyName = savedState?.newName || incomingState?.newName || null;
  const backRoute = savedState?.CodingpageRoute || incomingState?.backRoute || "/";
  const fromCodingdata = savedState?.sendFromCoding || incomingState?.sendFromCoding || "/";
console.log(fromCodingdata+" send by coding data");
  console.log(keyName);
  const currChapter =savedState?.foundedData;//|| incomingState?.chaptersend ||   null;
console.log(currChapter);
  console.log(savedState?.curr+" curr");
   console.log(currChapter+" after chap back");
       console.log(subTopic+" subTopic");//"HTML CSS"
        console.log(topicTitle+" topicTitle");//WebDevlopment

        console.log(keyName+"keyNamr");//Coding

    console.log(backRoute+"backRoute");//Coding
  const [selectedChapter, setSelChap] = useState(null); 
    // localStorage.setItem("mainPageSelection", JSON.stringify({
    //    curr:chapters
    //   }));
  //    useEffect(() => {
  //   if (savedState) {
  //     localStorage.setItem("mainPageSelection", JSON.stringify({
  //       curr:chapters
  //     }));
  //   }
  // }, [savedState]);
   
    
    //console.log(backR);
//console.log(subTopic);
 

    const [chapters, setChapters] = useState(currChapter||[]);
    console.log(chapters[0].name+" chapters");
  const [openChapter, setOpenChapter] = useState(null);
   console.log(openChapter+" openchapters");
  const [openTopic, setOpenTopic] = useState(null);

  const [videoUrl, setVideoUrl] = useState(null); // fullscreen video overlay
const nextVideoTimer = useRef(null);
const [showReplay, setShowReplay] = useState(false);
 const [subject , setSubject] = useState([]);
 const [Click , setClick] = useState(false);
 const [nextTopic , setTopic] = useState(null);
 const [currentTime, setCurrentTime] = useState(0);
const [topicStart, setTopicStart] = useState(0);
const [topicEnd, setTopicEnd] = useState(0);

const [keyNameVal , setKeyNameVal] = useState(null);


const playerRef = useRef(null);


const [currentTopicIndex, setCurrentTopicIndex] = useState({
  chapterIndex: null,
  topicIndex: null,
});
// useEffect(()=> {

//   if(currChapter) {
//   setChapters(currChapter)
// }

// }
// ,[currChapter]
// );
  const { user } = useContext(AuthContext);

 // const chapters = HTMLDATA?.[0]?.Coding?.[0]?.['Web Devlopment']?.[0]?.['HTML/CSS'] || [];
const findKeyInJson = (obj, key) => {//search in => obj what is search key
  const stack = [obj]; // iterative approach → avoids deep recursion overhead

  while (stack.length) {
    const current = stack.pop();

    if (current && typeof current === "object") { //if we find that topic in obj
      if (Object.prototype.hasOwnProperty.call(current, key)) {  
        return current[key];  //then return all data of that topic of obj
      }
       //if not find go in deeper of the current obj like subobj or sub array 
      // push child objects (values) to stack
      for (const k in current) {
        const val = current[k];
        if (val && typeof val === "object") {
          stack.push(val);
        }
      }
    }
  }

  return null; // key not found
};
//useEfffect use for extra work 
useEffect(() => {
  console.log(subTopic);
  if (subTopic) {//subTopic
    const foundData = findKeyInJson(HTMLDATA, subTopic);
      console.log(foundData);

      localStorage.setItem("mainPageSelection", JSON.stringify({
           foundedData:foundData 
      }))
    if (foundData) {
      setChapters(foundData);
    } else {
      console.warn(`No data found for: ${subTopic}`);
    }
  }
}, [subTopic]);

useEffect(()=>{
  if (keyName!==null) {
    setKeyNameVal(keyName);
  }
}); 
  // Open specific YouTube section
  const openVideo = (videoId, start, end , chapterIndex , topicIndex) => {

  setTopicStart(start);
  setTopicEnd(end);
  setCurrentTime(0);
//const embedUrl  = `https://www.youtube.com/embed/${videoId}?playsinline=1&mute=1`;


   const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&start=${start}&end=${end}&autoplay=1&controls=32`;
//const embedUrl = `https://www.youtube.com/embed/${videoId}?playsinline=1&enablejsapi=1&mute=1&start=${start}`;


// const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${start}&end=${end}&autoplay=1&rel=0&modestbranding=1&controls=0&fs=0&disablekb=1&iv_load_policy=3`;
   //const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${start}&end=${end}&autoplay=1&rel=0&modestbranding=1&controls=0&fs=0&disablekb=1&iv_load_policy=3&showinfo=0&playlist=${videoId}&loop=1`;

  setVideoUrl(`${embedUrl}&t=${Date.now()}`);
  setCurrentTopicIndex({ chapterIndex, topicIndex });
  setOpenTopic(chapters[chapterIndex].topics[topicIndex].id);
    setShowReplay(false); 
     if (nextVideoTimer.current) {
    clearTimeout(nextVideoTimer.current);
  }
   
       

    // Wait 5 seconds before next topic starts
 


  };



   

const closeVideo = () => {
    setVideoUrl(null)
    clearTimeout(nextVideoTimer.current );
};
 



const SetState = (ids , selectSubject)=>{

      //  setOpenChapter( {openChapter === ids ? null : chapter.id); 
     console.log(currChapter);
setChapters(currChapter);

   setOpenChapter(ids);
   
//    if (!user) {
   

//          navigate("/login", { 
//       replace: true, 
//       state: { from: location.pathname , currChapter : chapters  } 
//     });
      
   
//    }else{
 
// if (currChapter !==null) {
//     if(openChapter!==ids) {
//                setChapters(currChapter);
//             setOpenChapter(ids);
//               }
            
//            setOpenChapter(ids);
//                  setSubject(selectSubject);
//               setClick(true);
//   //  if (Click === true) {
//   //         setOpenChapter(null);
//   //         setClick(false);
//   //         setSubject([]);
//   //     }else{
//   //   console.log(currChapter); 
//   //       if(openChapter!==ids) {
//   //              setChapters(currChapter);
//   //           setOpenChapter(ids);
//   //             }
            
//   //          setOpenChapter(ids);
//   //                setSubject(selectSubject);
//   //             setClick(true);
//   //     }
// }
  
  

    
//    }
     
              
          
  }

const backFromSub = ()=>{
  console.log(keyNameVal+"Titlesone");
  console.log(chapters+"chapters");
      navigate("/coding", {state : {Titlesone : keyNameVal , currOpenChap : chapters}});//
}
const [handleone, setHandleone] = useState(false);
const [handletwo, setHandletwo] = useState(false);
const handlesidebar = ()=>{
   if (handleone===false) {
      setHandleone(true);

   }else{
    
      setHandleone(false);
   }
}


      
  

  


const handleother = (topicid ) =>{

   setOpenTopic(openTopic === topicid ? null : topicid)

    
}

// Go to next topic
const goNextVideo = () => {
  let { chapterIndex, topicIndex } = currentTopicIndex;

  const chapter = chapters[chapterIndex];
  if (!chapter) return;

  const totalTopics = chapter.topics.length;

  // if next topic exists
  if (topicIndex + 1 < totalTopics) {
    const nextIndex = topicIndex + 1;
    const nextTopic = chapter.topics[nextIndex];

    openVideo(
      nextTopic.videoId,
      nextTopic.start,
      nextTopic.end,
      chapterIndex,
      nextIndex
    );
  }
};

// Go to previous topic
const goPrevVideo = () => {
  let { chapterIndex, topicIndex } = currentTopicIndex;

  const chapter = chapters[chapterIndex];
  if (!chapter) return;

  // if previous topic exists
  if (topicIndex - 1 >= 0) {
    const prevIndex = topicIndex - 1;
    const prevTopic = chapter.topics[prevIndex];

    openVideo(
      prevTopic.videoId,
      prevTopic.start,
      prevTopic.end,
      chapterIndex,
      prevIndex
    );
  }
};

useEffect(() => {
  // load YouTube Iframe API only once
  if (!window.YT) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
}, []);


// Detect when YouTube video ends -> Auto Next
useEffect(() => {
  if (!videoUrl) return;

  const createPlayer = () => {
    new window.YT.Player("myPlayer", {
      events: {
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            goNextVideo();
          }
        },
      },
    });
  };

  if (window.YT && window.YT.Player) {
    createPlayer();
  } else {
    window.onYouTubeIframeAPIReady = createPlayer;
  }
}, [videoUrl]);




  return (
<>
    
    {videoUrl ===null ?    <Navbar/>:null}
    <div className="container">
   
        
      {/* Sidebar */}
      <div className="sidebar" style={{paddingTop:'4.6rem'}}>
          <ul style={{listStyleType:'none' , marginRit1:'2rem' , paddingRight:'1rem'}}>
          {chapters.map((chapter , cIndex) => (

             

            <li key={chapter.id}>
              <button
                className={`chapter-btn ${openChapter === chapter.id ? 'active' : ''}`   }
                onClick={()=>setOpenChapter(openChapter === chapter.id ? null : chapter.id)}
                 style={{zIndex:100000}}
              >
                {chapter.name }
                
              </button>

              {openChapter === chapter.id && (
                <ul style={{listStyleType:'none'}}>
                  {chapter.topics.map((topic , tIndex) => (
                    <li key={topic.id}>
                      <button
                          className={`topic-btn ${
                           currentTopicIndex.chapterIndex === cIndex &&
                           currentTopicIndex.topicIndex === tIndex
                           ? "playing-topic"
                           : ""
                           }`}
                        onClick={() =>
                          handleother(topic.id)
                         
                        }
                      >
                        {topic.name}
                      </button>
                               
                      {openTopic === topic.id && (
                        <div className="links"> 
                          {/* Practice video button */}
                          {topic.videoId && (
                            <button
                              className="link-btn"
                              onClick={() =>
                                openVideo(topic.videoId, topic.start, topic.end  , cIndex , tIndex)
                              }
                            >
                              Lecture
                            </button>
                          )}

                          {/* Quiz button */}
                          {topic.quizLink && (
                            <a
                              href={topic.quizLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="link-btn">{topic.id === 1 ? "Important" : "Extra Material"}</button>
                            </a>
                          )}

                          {/* Optional big practice */}
                          {topic.bigPractice && (
                            <a
                              href={topic.bigPractice}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="link-btn big-practice-btn">
                                Big Practice
                              </button>
                            </a>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="main-content">
        <h1>Welcome to the {subTopic} full course </h1>
        <p>Select a chapter to begin your learning journey.</p>



         
        {subject && subject.length > 0 ? (
  <>
    <h4>Prerequisite / If not some following topic added in course:</h4>
    <ol>
      {subject.map((sub, index) => (
        <li key={index}>{sub}</li>
      ))}
    </ol>
  </>
) : null}
       
         
      </div>

      {/* Fullscreen Video Overlay */}
      {videoUrl && (
              



       


            

        <div
        className='video-overlay'
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
              background: "linear-gradient(135deg, #000000, #4383c7)",
            zIndex: 9999,
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
              
          
             
 <div className="toggle-sidebar" onClick={()=>handlesidebar()}>
  ☰
   

</div>

   
     <div className={handleone===false ? "sidebarvideo" : "sidebarleft"}
     style={{ height:'100vh' }}>

      {/* <ChevronLeft className='leftside' style={{
          position:'absolute',
          left:'370px',
           
      }}/> */}
 

      {/* <div>{<ChevronLeft/> }</div> */}
        <ul style={{listStyleType:'none'}}>
          {chapters.map((chapter , cIndex) => (
            <li key={chapter.id}>
              <button
                 className={`chapter-btn ${openChapter === chapter.id ? 'active' : ''}`   }
                onClick={() =>
                  setOpenChapter(openChapter === chapter.id ? null : chapter.id)
                }
              >
                {chapter.name}
              </button>

              {openChapter === chapter.id && (
                <ul style={{listStyleType:'none'}}>
                  {chapter.topics.map((topic , tIndex) => (
                    <li key={topic.id}>
                      <button
                            className={`topic-btn ${
                           currentTopicIndex.chapterIndex === cIndex &&
                           currentTopicIndex.topicIndex === tIndex
                           ? "playing-topic"
                           : ""
                           }`}
                        onClick={() =>
                          setOpenTopic(openTopic === topic.id ? null : topic.id)
                        }
                      >
                        {topic.name}
                      </button>

                      {openTopic === topic.id && (
                        <div className="links">
                          {/* Practice video button */}
                          {topic.videoId && (
                            <button
                              className="link-btn"
                              onClick={() =>
                                openVideo(topic.videoId, topic.start, topic.end , cIndex , tIndex)
                              }
                            >
                                Lecture
                            </button>
                          )}

                          {/* Quiz button */}
                          {topic.quizLink && (
                            <a
                              href={topic.quizLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="link-btn" > {topic.id === 1 ? "Important" : "Extra Material "}</button>
                            </a>
                          )}

                            
                          {topic.bigPractice && (
                            <a
                              href={topic.bigPractice}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="link-btn big-practice-btn">
                                Big Practice
                              </button>
                            </a>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            ))}
          </ul>
          </div>


 <div style={{ position: "relative", width: "90%", height: "90%" }}>
  {showReplay ? (
    <div
      style={{
        width: "106%",
        height: "106%",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <button
        style={{
          backgroundColor: "#ff0000",
          color: "white",
          border: "none",
          padding: "1rem 2rem",
          fontSize: "1.5rem",
          cursor: "pointer",
          borderRadius: "8px",
        }}
        onClick={() => {
          const { chapterIndex, topicIndex } = currentTopicIndex;
          const currentTopic = chapters[chapterIndex]?.topics[topicIndex];
          if (currentTopic) {
            openVideo(
              currentTopic.videoId,
              currentTopic.start,
              currentTopic.end,
              chapterIndex,
              topicIndex
            );
          }
        }}
      >
        🔁 Replay
      </button>
    </div>) : (
    
<div className="relativenew w-full">

  {/* Top Navigation Buttons */}
  <div className="nav-buttons">

    <button className="video-nav-btna" onClick={()=> goPrevVideo()}>
      &lt; Prev
    </button>

    <button className="video-nav-btn" onClick={()=> goNextVideo()}>
      Next &gt;
    </button>

    <button
      onClick={backFromSub}
      className={handleone === false ? "mainpage":"mainpage-in-sidebar"}
    >
      main page
    </button>
  </div>

  {/* Video */}
  

<div className='videmain'>

  <iframe
 
 id='myPlayer'
    key={videoUrl}
     
    src={videoUrl}
    title="YouTube Video"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    className={handleone==false ? "iframe_When_handleone_false": "iframe_When_handleone_true"}
  />
</div>
 
{/* full-iframe rounded-xl shadow videoURL */}
  {/* <iframe
  id="myPlayer"
  key={videoUrl}
  src={videoUrl}
  title="YouTube Video"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className={handleone ? "rotate-90" : "video-player"}
></iframe> */}



  
 

  {/* Close Button */}
  <button
    onClick={closeVideo}
    className="close-btn"
  >
    Close
  </button>

</div>
)}
    </div>
</div>
      )}
      </div>
    </>
 

      
  )
};

export default AllRoutes;
