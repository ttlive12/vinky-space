import { createContext } from "react";

const loadingContext = createContext({
  openContact: false,
  setOpenContact: (openContact: boolean) => {},
});

export default loadingContext;
