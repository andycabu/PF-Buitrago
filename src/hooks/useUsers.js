import { useContext } from "react";
import { UsersContext } from "../context/UsersContext";

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers debe estar dentro del proveedor UsersContext");
  }
  return context;
};
