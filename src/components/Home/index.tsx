"use client";

import { Simonetta } from "@/font";

const Header = () => {
  return (
    <section
      className="w-full h-[100vh] animate-scaleOut"
      id="home"
      style={Simonetta.style}
    >
      <div className="flex flex-col text-white  py-[15rem]">
        <div
          className=" text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] 
          h-[6rem] md:h-[7rem] lg:h-[8rem] xl:h-[9rem]
          leading-[6rem] md:leading-[7rem] lg:leading-[8rem] xl:leading-[9rem]
         overflow-hidden tracking-widest"
        >
          <p className="text-center h-fit animate-scroll1">Hello</p>
          <p className="text-center h-fit animate-scroll2">Creative Frontend</p>
        </div>
        <div
          className="text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] 
        h-[6rem] md:h-[7rem] lg:h-[8rem] xl:h-[9rem]
        leading-[6rem] md:leading-[7rem] lg:leading-[8rem] xl:leading-[9rem]
        overflow-hidden tracking-widest
        "
        >
          <p className="text-center h-fit animate-scroll1 bg-gradient-to-t from-green-200 to-white text-transparent bg-clip-text">
            I&apos; m Vinky
          </p>
          <p className="text-center h-fit animate-scroll2 bg-gradient-to-t from-green-200 to-white text-transparent bg-clip-text">
            Developer
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
