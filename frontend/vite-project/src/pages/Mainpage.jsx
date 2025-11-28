// import * as React from 'react';

// import { useNavigate } from "react-router-dom";
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import CardActionArea from '@mui/material/CardActionArea';
// import Navbar from '../navbar';
// import "/styles/mainpage.css"
// import codingimage  from "../allphoto/codingimage.webp"
// import science from "../allphoto/science.avif"
// import HTMLD from "../DBs.json";


// export default function SelectActionCard() {
//   const [selectedCard , setSelectedCard] = React.useState(0);
// //const [selectedTitle , setTitle] = React.useState(null);
//   const [selectOpt , setOpt] = React.useState("");
// const navigate = useNavigate();
// const cards = HTMLD;
//   const setTheOption = (selectedoption , TitleofCard)=>{

//   //     const dataToSave = {
//   //   title: cards[selectedoption].title,
//   //   selectedIndex: selectedoption,
   
//   // };
//       const dataToSave = {
//     title: TitleofCard,
//     selectedIndex: selectedoption,
   
//   };

//   console.log(dataToSave.title+" data to save ");

//    localStorage.setItem("mainPageSelection", JSON.stringify(dataToSave));
//    //const here = cards[selectedoption].title;
//    //console.log(cards[selectedoption].title);
//         // if(cards[selectedoption].title === 'Coding') {
//         //         navigate("/coding" , { state : {Titles:selectedTitle}});
//         // }
//        navigate("/coding");
//   //           setTimeout(() => {
//   //   navigate("/coding");
//   // }, 10000);
//             //  , { state : {Titles: cards[selectedoption].title , selected : selectedCard}}
//         }
//   const settingValue = (indexValue , titleValue)=>{
//      setSelectedCard(indexValue);
//      //console.log(titleValue);
//      //setTitle(titleValue);

     
//   }
//   const classObj = {
//     "Coding":codingimage,
//     "Science":science
    
//   };

//   const cardstitle=(titlecard)=>{
//  return  classObj[titlecard];
//   } 
  



//   return (
//    <div className='boxx'>
//     <Navbar/>
//   <Box
       
//       sx={{
//         width: '100%',
//        gridTemplateColumns: {
//           xs: 'repeat(1, 1fr)',  // extra small screens → 1 card per row
//           sm: 'repeat(2, 1fr)',  // small screens → 2 per row
//           md: 'repeat(3, 1fr)',  // medium screens → 3 per row
//           lg: 'repeat(4, 1fr)',  // large screens → 4 per row
//         },
//             gridAutoRows: '250px', 
//         display: 'grid',
//         //gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
//         gap: 2,
//         margin: "4rem",
//         paddingBlock:'2rem',
        
        
//       }}
//     >

       

//              {cards.map((card, index) => (

//         <Card className='card'
        
//         key={index}

//           sx={{
//                borderRadius:'1rem',
//                backgroundColor:'pink'
//           }}
//         >
//           <CardActionArea
           
//             onClick={() => settingValue(index , card)  } 
//             data-active={selectedCard === index ? '' : undefined}
//             sx={{
             
//                height: '100%',
//                 backgroundColor:'none'
            
            
//             }}
//           >

//             <img
//       src={cardstitle(card.title)}
//       alt={card.title}
//       style={{
       
//         width: "100%",
//                       height: "200px",
//                       objectFit: "cover",
//                       display: "block",
       
        
//       }}




//     />

//        <button
//          onClick={()=>setTheOption(index , card.title)}     
       
//        style={{height:'20%' , width:'100%',
//          border: 'none',
//               backgroundColor: "#8A2BE2",

//                     fontSize: '1rem',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                     transition: '0.3s',
//                     borderRadius:'none',
                    
//        }}>{card.title}</button>
            
//           </CardActionArea>
//         </Card>
 
     
//       ))}


//     </Box>


          
//    </div>

   

 
    
//   );
// }

import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Navbar from "../navbar";
import "/styles/mainpage.css";
import codingimage from "../allphoto/codingimage.webp";
import science from "../allphoto/science.avif";
import HTMLD from "../DBs.json";

export default function SelectActionCard() {
  const navigate = useNavigate();
  const cards = HTMLD;

  const classObj = {
    Coding: codingimage,
    Science: science,
  };

  const cardstitle = (title) => classObj[title];

  const handleCardClick = (index, title) => {
    // Save to localStorage
    localStorage.setItem(
      "mainPageSelection",
      JSON.stringify({ title, selectedIndex: index })
    );

    // Navigate immediately
    navigate("/coding" , {state:{preData:title }});
  };

  return (
    <div className="boxx">
      <Navbar />
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gridAutoRows: "250px",
          gap: 2,
          margin: "4rem",
          paddingBlock: "2rem",
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: "1rem",
              backgroundColor: "pink",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => handleCardClick(index, card.title)}
          >
            <img
              src={cardstitle(card.title)}
              alt={card.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                height: "50px",
                width: "100%",
                backgroundColor: "#8A2BE2",
                fontSize: "1rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                userSelect: "none",
              }}
            >
              {card.title}
            </div>
          </Card>
        ))}
      </Box>
    </div>
  );
}
