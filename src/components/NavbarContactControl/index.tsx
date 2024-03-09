"use client";

import { useState } from "react";
import Context from "./context";
import Navbar from "../Navbar";
import Contact from "../Contact";

const NavbarContactControl = () => {
  const [openContact, setOpenContact] = useState(false);
  return (
    <Context.Provider value={{openContact, setOpenContact}}>
      <Navbar />
      <Contact />
    </Context.Provider>
  );
};

export default NavbarContactControl;
