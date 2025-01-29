"use client"
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap"
import Sort_Cabinet from "../images/Sort_Cabinet.png"
import Sort_Ghost_Cabinet from "../images/Sort_Ghost_Cabinet.png"
import Add_Icon from '../icons/add.svg'
import Close_IconUrl from '../icons/close.svg'
import Icon1Url from '../icons/ip1.svg'
import Icon2Url from '../icons/ip2.svg'
import Icon3Url from '../icons/ip3.svg'
import Icon4Url from '../icons/ip4.svg'
import Icon5Url from '../icons/ip5.svg'
import Icon6Url from '../icons/ip6.svg'
import Icon7Url from '../icons/ip7.svg'
// import Icon6Url from '../icons/ip6.svg?url'


// type IconGridProps = {
//   onClose: () => void;
//   iconSize: number;
// };

// const IconGrid: React.FC<IconGridProps> = ({ onClose, iconSize }) => (
//   <div className="flex items-center space-x-2">
//     {/* X Icon */}
//     <Image
//       src={Close_IconUrl}
//       alt="Close Button"
//       width={iconSize}
//       className="cursor-pointer"
//       onClick={onClose}
//     />
//     {/* Icons */}
//     {[Icon1Url, Icon2Url, Icon3Url, Icon4Url, Icon5Url, Icon6Url].map((ip,idx) => (
//         <Image 
//             key={idx}
//             src={ip}
//             alt={`Icon ${idx + 1}`}
//             width={iconSize}
//             height={iconSize}
//             className="cursor-pointer"
//         />
//     ))}
//   </div>
// );

const Cabinet: React.FC = () => {
    const [showIcons, setShowIcons] = useState<boolean>(false);
    const [cabinets, setCabinets] = useState(["existing"]);
    const cabinetRefs = useRef<(HTMLDivElement | null)[]>([]);
    
    // const Icon_Panel_Width = 25;

    useEffect(() => {
        if (cabinets.length > 1) {
            //animate cabinets whenever a new cabinet is added
            if (cabinetRefs.current) {
                gsap.to(cabinetRefs.current.slice(0, -1).filter(Boolean), {
                    x: "-=10",
                    duration: 1,
                    stagger: 0.1,
                    ease: "power2.out",
                });
            }
        }
    }, [cabinets])

    const handleIconClick = (iconIndex: number) => {
        setShowIcons(false);

        if (iconIndex === 5) {
            setCabinets([...cabinets, "ghost"])
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen p-8 gap-16 sm:p-20 font-poppins pointer-events-auto">
      <div className="flex flex-col items-center space-y-4 relative">
        {/* Add Section */}
        <div className="relative h-[50px] flex items-center justify-center w-full">
          {!showIcons ? (
            <div className="grid grid-cols-[auto_1fr_auto] items-center w-full z-10">
              <Image
                src={Add_Icon}
                alt="Add Button"
                width={15}
                height={15}
                className="force-pointer cursor-pointer block"
                onClick={() => setShowIcons(true)}
              />
              <span className="text-2xl text-center relative left-[-4px]">Add</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 z-10">
                <Image
                    src={Close_IconUrl}
                    alt="Close Button"
                    width={25}
                    className="cursor-pointer block"
                    onClick={() => setShowIcons(false)}
                />
                 {[Icon1Url, Icon2Url, Icon3Url, Icon4Url, Icon5Url, Icon6Url, Icon7Url].map((ip,idx) => (
                    <Image 
                        key={idx}
                        src={ip}
                        alt={`Icon ${idx + 1}`}
                        width={25}
                        height={25}
                        className="cursor-pointer block"
                        onClick={() => handleIconClick(idx)}
                    />
                ))}
            </div>
            // <IconGrid onClose={() => setShowIcons(false)} iconSize={Icon_Panel_Width} />
          )}
        </div>



        {/* Cabinet Section */}
        <div className="flex">
            {cabinets.map((cabinet, index) => (
                <div 
                    key={index}
                    ref={(el) => {
                        if (el) {
                            cabinetRefs.current[index] = el; // Assign element
                        } else {
                            delete cabinetRefs.current[index]; // Clear when unmounted
                        }
                    }}
                    className="relative"    
                >
                    <Image 
                        src={cabinet === "existing" ? Sort_Cabinet : Sort_Ghost_Cabinet}
                        alt={cabinet === "existing" ? "Cabinet" : "Ghost Cabinet"}
                        width={200}
                        height={200}
                        className="object-contain"
                    />
                </div>
            ))}
        </div>

        {/* <div>
          <Image
            src={Sort_Cabinet}
            alt="Cabinet"
            width={200}
            height={200}
            className="object-contain"
          />
        </div> */}

        {/* Cabinet Label */}
        <div className="flex items-center">
          <span className="text-2xl">Cabinet</span>
        </div>

        <div className="flex items-center pt-8">
          <span className="text-xs">Tap to add cabinet</span>
        </div>
      </div>
    </div>
  );
}

export default Cabinet;





    {/* <div
          className="relative h-[50px] flex items-center justify-center w-full "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {showIcons ? (
            <IconGrid onClose={() => setShowIcons(false)} iconSize={Icon_Panel_Width} />
          ) : (
         <div className="grid grid-cols-[auto_1fr_auto] items-center w-full">
            <Image
                src={Add_IconUrl}
                width={15}
                alt="Add Button"
                className="object-contain"
            />
            <span className="text-2xl text-center relative left-[-4px]">Add</span>
        </div> 
          )}
        </div> */}