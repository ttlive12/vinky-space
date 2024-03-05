"use client";

import Logo from "@/assets/image/logo.png";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";
import { useState } from "react";

const list = [
  { name: "Home", link: "/", container: "#home" },
  { name: "Skills", link: "/", container: "#skills" },
  { name: "Experience", link: "/", container: "#skills" },
];
const links = [{ name: "VGPT", link: "/" }];
const Navbar = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const calculateDistance = (pos1: any, pos2: any) => {
    return Math.sqrt(
      Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)
    );
  };

  const calculateMove = () => {
    const dot = document.querySelector(".dot")!.getClientRects();
    const dotPosition = { x: dot[0].x, y: dot[0].y };
    const distance = calculateDistance(dotPosition, mousePosition) / 10;
    const maxDistance = 1;
    const moveDistance = Math.min(distance, maxDistance);
    const angle = Math.atan2(
      mousePosition.y - dotPosition.y,
      mousePosition.x - dotPosition.x
    );
    const moveX = moveDistance * Math.cos(angle) * 10;
    const moveY = moveDistance * Math.sin(angle) * 10;
    return { x: 7 + moveX, y: 7 + moveY };
  };

  const dotSpring = useSpring({
    to: {
      left: isHovered ? calculateMove().x : 7,
      top: isHovered ? calculateMove().y : 7,
    },
  });
  return (
    <div className="navbar-container flex fixed top-[20px] items-center h-[52px] w-full">
      <div className="logo absolute left-[20px] w-[90px]">
        <Image src={Logo} alt="" width={50} />
      </div>
      <div
        className="
      fixed bottom-[20px] lg:top-[20px]
      bg-[#333333] border-1 border-gray-700 lg:left-[100px] lg:w-min h-[52px] rounded-full flex items-center text-[#AAAAAA] px-6 gap-2
      left-[50%] -translate-x-1/2 lg:translate-x-0 text-[0.88rem]
      "
      >
        {list.map((item) => (
          <div
            className="group px-4 py-4 rounded-full flex justify-center items-center lg:hover:text-black lg:hover:bg-green-200 transition-colors"
            key={item.name}
            onClick={() => {
              const target = document.querySelector(item.container)!;
              target.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {item.name}
          </div>
        ))}
        <span>|</span>
        {links.map((item) => (
          <div
            className="group w-[40px] px-10 py-4 rounded-full flex justify-center items-center lg:hover:text-black lg:hover:bg-green-200 transition-colors"
            key={item.name}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div
        className="box bg-black group absolute lg:right-[20px] rounded-full py-[8px] pr-[8px] pl-[24px] flex justify-between items-center border-1 border-gray-700 gap-6 hover:bg-white transition-all
        scale-90 lg:scale-100 right-[5px]
        "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
      >
        <div className="w-min flex justify-between whitespace-pre items-center gap-3">
          <div className="flex content-center">
            <div className="relative w-[20px] h-[20px] bg-green-400 rounded-full">
              <animated.div
                className="dot absolute bg-black w-[6px] h-[6px] rounded-full"
                style={dotSpring}
              ></animated.div>
            </div>
          </div>
          <div className="text-white group-hover:invert">
            Available for new Projects.
          </div>
        </div>
        <div className="rounded-full bg-white text-black content-center py-3 px-8 font-bold group-hover:invert">
          Contact
        </div>
      </div>
    </div>
  );
};

export default Navbar;
