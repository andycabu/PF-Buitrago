import { useContext } from "react";
import { AsideContext } from "../context/AsideContext";

export const useAside = () => {
  const context = useContext(AsideContext);
  if (!context) {
    throw new Error("useAside debe estar dentro del proveedor AsideContext");
  }
  return context;
};
