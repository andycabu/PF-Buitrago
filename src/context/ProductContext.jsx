import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { database } from "../../db/firebase";
import { ref, onValue } from "firebase/database";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "all categories",
    minPrice: 0,
    title: "",
  });
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = window.localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const updateToLocalStorage = (state) => {
    window.localStorage.setItem("favorites", JSON.stringify(state));
  };
  const getProducts = () => {
    const productsRef = ref(database, "/products");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = data
        ? Object.entries(data).map(([key, value]) => ({ id: key, ...value }))
        : [];
      setProducts(productsArray);
    });
  };

  const addToFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === product.id);
      const newFavorites = isFavorite
        ? prevFavorites.filter((fav) => fav.id !== product.id)
        : [...prevFavorites, product];

      updateToLocalStorage(newFavorites);

      return newFavorites;
    });
  };

  useEffect(() => {
    if (products.length < 1) {
      getProducts();
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        setFilters,
        addToFavorite,
        filters,
        favorites,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
