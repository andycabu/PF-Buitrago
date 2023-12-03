import { useLocation } from "react-router-dom";
import ItemListContainer from "./ItemListContainer";
import { useEffect } from "react";
import { useFilters } from "../hooks/useFilters";

const Categories = () => {
  const { state, pathname } = useLocation();

  const { setFilters, resetFilters } = useFilters();
  useEffect(() => {
    setFilters((prevState) => ({
      ...prevState,
      category: state.category,
    }));

    return () => {
      resetFilters();
    };
  }, [pathname]);

  return <ItemListContainer />;
};
export default Categories;
