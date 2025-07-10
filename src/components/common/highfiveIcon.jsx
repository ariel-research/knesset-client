import React, { useState, useEffect } from "react";
import staticImg from "../../assets/high-five-static.png";
import highfive from "../../assets/high-five.gif";
import "./highfiveIcon.css";
const HighFiveButton = () => {
    const [hovered, setHovered] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
  
    useEffect(() => {
      if (hovered && !hasPlayed) {
        setPlaying(true);
        const timer = setTimeout(() => {
          setPlaying(false);
          setHasPlayed(true);
        }, 2000); // ← משך ה־GIF
        return () => clearTimeout(timer);
      }
  
      if (!hovered) {
        setPlaying(false);
        setHasPlayed(false);
      }
    }, [hovered, hasPlayed]);
  
    return (
      <button
        className={`highfive-button ${hovered ? "expanded" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={playing ? highfive : staticImg}
          alt="High Five"
          className={playing ? "highfive-gif" : "highfive-image"}
        />
      </button>
    );
  };
  
  export default HighFiveButton;