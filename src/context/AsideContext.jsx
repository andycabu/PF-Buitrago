import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useScreenWidth } from "../hooks/useScreenWidth";
import { useLocation } from "react-router-dom";

export const AsideContext = createContext();

export const AsideProvider = ({ children }) => {
  const [openAside, setOpenAside] = useState(null);
  const screenWidth = useScreenWidth();
  const location = useLocation();

  useEffect(() => {
    if (openAside) {
      document.body.style.overflow = "";
      setOpenAside();
    }
  }, [screenWidth, location]);

  const toggleAside = (asideId) => {
    if (openAside) {
      document.body.style.overflow = "";
      setOpenAside(false);
    } else {
      document.body.style.overflow = "hidden";
      setOpenAside(asideId);
    }
  };

  return (
    <AsideContext.Provider value={{ openAside, toggleAside, setOpenAside }}>
      {children}
    </AsideContext.Provider>
  );
};

AsideProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
