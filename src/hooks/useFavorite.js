// hooks/useFavorites.js
import { useState } from "react";
import { useProducts } from "./useProduct";

const useFavorites = () => {
  const { addToFavorite } = useProducts();
  const [likedProducts, setLikedProducts] = useState(() => {
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    return favoritesFromStorage.reduce((acc, product) => {
      acc[product.id] = true;
      return acc;
    }, {});
  });

  const toggleFavorite = (product) => {
    setLikedProducts((prev) => {
      const isAlreadyFavorite = likedProducts[product.id];
      return {
        ...prev,
        [product.id]: !isAlreadyFavorite,
      };
    });
    addToFavorite(product);
  };

  return { likedProducts, toggleFavorite };
};

export default useFavorites;
