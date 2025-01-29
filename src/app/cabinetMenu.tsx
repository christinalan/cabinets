"use client"
import React, { useState } from "react";
import Image from "next/image";
import Add_Icon from '../icons/add.svg'
import Close_Icon from '../icons/close.svg'
import Icon1 from '../icons/ip1.svg'
import Icon2 from '../icons/ip2.svg'
import Icon3 from '../icons/ip3.svg'
import Icon4 from '../icons/ip4.svg'
import Icon5 from '../icons/ip5.svg'
import Icon6 from '../icons/ip6.svg'
import Icon7 from '../icons/ip7.svg'

interface CabinetMenuProps {
    onHoverCabinet: (type: string | null) => void; // Callback to communicate hovered cabinet type
    onClickCabinet: (type: string) => void;
  }

const CabinetMenu: React.FC<CabinetMenuProps> = ({onHoverCabinet, onClickCabinet}) => {
    const [showIcons, setShowIcons] = useState<boolean>(false);

    const cabinetTypes = [
        { type: "Sort", icon: Icon1 },
        { type: "Scout", icon: Icon2 },
        { type: "Send", icon: Icon3 },
        { type: "Stack", icon: Icon4 },
        { type: "Signed", icon: Icon5 },
        { type: "Store", icon: Icon6 },
        { type: "Search", icon: Icon7 },
    ]

    const handleMouseEnterIcon = (type: string) => {
        onHoverCabinet(type); // passes hovered cabinet type to parent
    }

    const handleMouseLeaveIcon = () => {
        onHoverCabinet(null);
    }

    return (
            <div className="relative">
                <div 
                    className="flex place-items-center"
                    onMouseEnter={() => setShowIcons(true)}
                    onMouseLeave={() => setShowIcons(false)}
                >
                    {showIcons ? (
                        <div className="flex gap-8">
                            <Image
                                src={Close_Icon}
                                alt="Close Button"
                                width={25}
                                className="cursor-pointer block"
                                onClick={() => setShowIcons(false)}
                            />
                            <div className="flex flex-row items-center gap-2">
                                {cabinetTypes.map((cabinet) => (
                                    <div
                                        key={cabinet.type}
                                        className="cursor-pointer block"
                                        onMouseEnter={() => handleMouseEnterIcon(cabinet.type)}
                                        onMouseLeave={handleMouseLeaveIcon}
                                        onClick={() => onClickCabinet(cabinet.type)}   
                                    >
                                    <Image
                                        src={cabinet.icon}
                                        alt={`${cabinet.type} Icon`}
                                        width={25}
                                        height={25}
                                        className="cursor-pointer"
                                    />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="relative flex items-center px-8">
                                {/* Add icon */}
                                <div className="absolute left-0">
                                    <Image 
                                        src={Add_Icon}
                                        alt="Add Button"
                                        width={15}
                                        height={15}
                                        className="cursor-pointer block"
                                        onClick={() => setShowIcons(true)}
                                    />
                                </div>
                            <div className="flex-grow flex justify-center">
                            <span className="text-2xl text-center">Add</span>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>

    )
}

export default CabinetMenu;