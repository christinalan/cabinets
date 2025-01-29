"use client"
import React, { useState, useEffect, useRef } from "react";
import CabinetMenu from './cabinetMenu'
import Cabinets from './cabinets';
// import { gsap } from "gsap"

// Import all ghost cabinet images
import Sort_Ghost_Cabinet from "../images/Sort_Ghost_Cabinet.png"
import Scout_Ghost_Cabinet from "../images/Scout_Ghost_Cabinet.png";
import Send_Ghost_Cabinet from "../images/Send_Ghost_Cabinet.png";
import Stack_Ghost_Cabinet from "../images/Stack_Ghost_Cabinet.png";
import Sign_Ghost_Cabinet from "../images/Sign_Ghost_Cabinet.png";
import Search_Ghost_Cabinet from "../images/Search_Ghost_Cabinet.png";
import Store_Ghost_Cabinet from "../images/Store_Ghost_Cabinet.png";

import Sort_Cabinet_R from "../images/Sort_Cabinet_R.png"
import Scout_Cabinet_R from "../images/Scout_Cabinet_R.png"
import Send_Cabinet_R from "../images/Send_Cabinet_R.png"
import Stack_Cabinet_R from "../images/Stack_Cabinet_R.png"
import Sign_Cabinet_R from "../images/Sign_Cabinet_R.png"
import Search_Cabinet_R from '../images/Search_Cabinet_R.png'
import Store_Cabinet_R from "../images/Store_Cabinet_R.png"

interface Cabinet {
    type: string;
    src: string; // Image source
  }

const CabinetManager: React.FC = () => {
    const [hoveredCabinetType, setHoveredCabinetType] = useState<string | null>(null)
    const [cabinets, setCabinets] = useState<Cabinet[]>([]); // state of ghost cabinets
    const [solidCabinets, setSolidCabinets] = useState<Cabinet[]>([]); // state of solid cabinets

    // const cabinetRefs = useRef<(HTMLDivElement | null)[]>([]); 
    // const solidCabinetRefs = useRef<(HTMLDivElement | null)[]>([]); 

    // Map cabinet types to their corresponding image sources
    const cabinetImages: Record<string, {ghost: string; solid: string }> = {
        Sort: {ghost: Sort_Ghost_Cabinet.src, solid: Sort_Cabinet_R.src},
        Scout: {ghost: Scout_Ghost_Cabinet.src, solid: Scout_Cabinet_R.src},
        Send: {ghost: Send_Ghost_Cabinet.src, solid: Send_Cabinet_R.src},
        Stack: {ghost: Stack_Ghost_Cabinet.src, solid: Stack_Cabinet_R.src},
        Signed: {ghost: Sign_Ghost_Cabinet.src, solid: Sign_Cabinet_R.src},
        Store: {ghost: Store_Ghost_Cabinet.src, solid: Store_Cabinet_R.src},
        Search: {ghost: Search_Ghost_Cabinet.src, solid: Search_Cabinet_R.src},
    };

    useEffect(() => {
        //for handling the hover state
        if (hoveredCabinetType && cabinetImages[hoveredCabinetType]) {
            const newCabinet = {
                type: hoveredCabinetType,
                src: cabinetImages[hoveredCabinetType].ghost,
              };
        
              // Add the new cabinet to the state 
              setCabinets([newCabinet]);
        
              console.log("New Cabinet Added:", newCabinet);
            }

    }, [hoveredCabinetType])

    //click function for ghost to solid state
    const handleClick = (type: string) => {
        if (!cabinetImages[type]) return;
        
        const solidCabinet = {
            type,
            src: cabinetImages[type].solid
          }

        setCabinets([]);
        setSolidCabinets((prev) => [...prev, solidCabinet]);;
    }


    return (
        <div 
            className="flex flex-col items-center min-h-screen gap-12 p-8 sm:p-20 pointer-events-auto mx-auto"
            onClick={() => setCabinets([])} // handles the ghost to solid transformation
            >
            <CabinetMenu onHoverCabinet={setHoveredCabinetType} onClickCabinet={handleClick}/>
            <Cabinets  
                cabinets={cabinets}
                solidCabinets={solidCabinets}
            />
        </div>
    )
}

export default CabinetManager;