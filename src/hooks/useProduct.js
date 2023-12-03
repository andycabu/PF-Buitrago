import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProduct debe estar dentro del proveedor ProductContext"
    );
  }
  return context;
};
