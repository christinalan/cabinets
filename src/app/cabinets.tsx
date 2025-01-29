"use client"
import React, { useState, useRef, useEffect }  from "react";
import Image from "next/image";
import { gsap } from "gsap"
// Import cabinet images
// import Sort_Cabinet from "../images/Sort_Cabinet.png"


interface Cabinet {
  type: string;
  src: string; // Image source
}

interface CabinetsProps {
  cabinets: Cabinet[];
  solidCabinets: Cabinet[];
}

const Cabinets: React.FC<CabinetsProps> = ({  cabinets, solidCabinets, }) => {
// const existingCabinetRef = useRef<HTMLDivElement | null>(null);
const [isFirstAnimation, setIsFirstAnimation] = useState(true); // Track if it's the first animation
const cabinetRefs = useRef<(HTMLDivElement | null)[]>([]);
const solidCabinetRefs = useRef<(HTMLDivElement | null)[]>([]);

useEffect(() => {
  if (cabinets.length > 0 && isFirstAnimation ) {
    const timeline = gsap.timeline();

      // Animate the newest ghost cabinet appearing
      const lastGhost = cabinetRefs.current[cabinetRefs.current.length - 1];
      if (lastGhost) {
        timeline.fromTo(
          lastGhost,
          { opacity: 0, x: 10 }, // Start right and transparent
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" } // Animate into view
        );
      }

    // Animate the existing cabinet
    // if (existingCabinetRef.current) {
    //   timeline.to(
    //     existingCabinetRef.current,
    //     { x: -25, duration: 0.5, ease: "power2.out"}, // Move left
    //     0, // existing starts at the same time as the ghost cabinet animation
    
    //   );
    // }

    setIsFirstAnimation(false);

    // Animate the ghost cabinets
    // timeline.fromTo(
    //   cabinetRefs.current.filter(Boolean), // Filter out null refs
    //   { opacity: 0, x: 0}, // Start right and transparent
    //   { opacity: 1, x: 10, duration: 0.5, ease: "power2.out" } // Animate into view
    // );

  }

}, [cabinets, isFirstAnimation]);

  useEffect(() => {
    if (solidCabinets.length > 0) {
      const timeline = gsap.timeline();
      const lastCabinet = solidCabinetRefs.current[solidCabinetRefs.current.length - 1]; // Get the last cabinet

           // Move all existing solid cabinets left when a new one is added
     if (solidCabinetRefs.current.length > 0) {
      
      timeline.to(
        solidCabinetRefs.current.slice(0, -1).filter(Boolean), // Select all except the last one
        { x: "-=5", duration: 1, ease: "power2.out", stagger: 0.1 } // Shift left
      );
    }

      gsap.fromTo(
        lastCabinet, // Filter out null refs
        { opacity: 0.5, scale: 0.99}, // Start invisible and scaled down
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" } // Fade in and scale up
      );
    }
  }, [solidCabinets]);


  return (
    <div className="flex flex-col items-center gap-8">
        {/* This cabinet is always displayed */}
        <div 
          className="flex flex-row gap-1 w-max overflow-x-auto scroll-smooth px-8 py-2"
          
          >
          {/* <div ref={existingCabinetRef}>
            <Image 
                src={Sort_Cabinet}
                alt={"Sort Cabinet"}
                width={200}
                height={200}
                className="object-contain"
            />
          </div> */}
        
      {/* Display ghost cabinet if type is hovered */}
        <div className="flex flex-row gap-1">
         {/* Display solid cabinets */}
         {solidCabinets.map((cabinet, index) => (
          <div
            key={`solid-${index}`}
            ref={(el) => {
              if (el) {
                solidCabinetRefs.current[index] = el; // Store solid cabinet ref
              }
            }}
            className="relative"
          >
            <Image
              src={cabinet.src}
              alt={`${cabinet.type} Solid Cabinet`}
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        ))}

       {/* Display ghost cabinet */}
       {cabinets.map((cabinet, index) => (
        <div
          key={`ghost-${index}`}
          ref={(el) => {
            if (el) {
              cabinetRefs.current[index] = el; // Store ghost cabinet ref
            }
          }}
          className="relative"
        >
          <Image
            src={cabinet.src}
            alt={`${cabinet.type} Ghost Cabinet`}
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
      ))}
        </div>

      </div>

        {/* Cabinet Label */}
        <div className="flex items-center">
          <span className="text-2xl">Cabinet</span>
        </div>

        <div className="flex items-center pt-4">
          <span className="text-xs">Tap to add cabinet</span>
        </div>
    </div>
  );
};

export default Cabinets;

