
import * as React from "react";
import { useNavigate  } from "react-router-dom";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Navbar from "../navbar";
import "/styles/mainpage.css";
import codingimage from "../allphoto/codingimage.webp";
import science from "../allphoto/science.avif";
import HTMLD from "../DBs.json";

export default function SelectActionCard() {
  const navigate = useNavigate();
const [allseleccards , setallSelCard] = useState(null);
   useEffect(() => {

    const saved = localStorage.getItem("mainPageSelection");

    if (saved ) {
const newcard = JSON.parse(saved).allcard;

  // newcard.forEach((subcard) => {
  //   console.log(subcard.title+"subtitle here"); // only if subcard has .title
  // });

      setallSelCard(newcard);
    
    }
  }, []);  

  const cards = HTMLD ||allseleccards;
  // if (allseleccards[0].title) {
  //   console.log(allseleccards[0].title+" allcardssek");
  // }
  if (allseleccards) {
     cards.forEach((subcard) => {
    console.log(subcard.title+"subtitle here"); // only if subcard has .title
  });
  }
  
  
  
   console.log(cards+' here cards');
  const classObj = {
    Coding: codingimage,
    Science: science,
  };



  const cardstitle = (title) => classObj[title];



  const handleCardClick = (index, title , totalcards) => {
    console.log(totalcards.title+" totalcard");
    // Save to localStorage
    localStorage.setItem(
      "mainPageSelection",
      JSON.stringify({ title, selectedIndex: index , allcard:totalcards})
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
            onClick={() => handleCardClick(index, card.title , cards)}
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
