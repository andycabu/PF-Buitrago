import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { useProducts } from "../hooks/useProduct";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { products, favorites } = useProducts();
  const [filters, setFilters] = useState({
    minPrice: 0,
    category: "all categories",
    title: "",
  });
  const resetFilters = () => {
    setFilters({
      minPrice: 0,
      category: "all categories",
      title: "",
    });
    setFavoritesFilters({
      minPrice: 0,
      category: "all categories",
      title: "",
    });
  };
  const [favoritesFilters, setFavoritesFilters] = useState(filters);

  const filterProducts = (products, appliedFilters) => {
    return products.filter((product) => {
      return (
        product.price >= appliedFilters.minPrice &&
        (appliedFilters.category === "all categories" ||
          product.category === appliedFilters.category) &&
        product.title.toLowerCase().includes(appliedFilters.title.toLowerCase())
      );
    });
  };
  const filterFavorites = (favorites) => {
    return filterProducts(favorites, favoritesFilters);
  };

  const filteredProducts = filterProducts(products || [], filters);
  const filteredFavorites = filterFavorites(favorites || []);

  return (
    <FilterContext.Provider
      value={{
        filters,
        resetFilters,
        setFilters,
        filterProducts,
        setFavoritesFilters,
        filteredProducts,
        filteredFavorites,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.node,
};
