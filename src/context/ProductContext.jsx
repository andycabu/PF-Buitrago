import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { db } from "../../db/firebase";
import { collection, onSnapshot } from "firebase/firestore";

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
  const getProducts = async () => {
    const productosRef = collection(db, "products");

    onSnapshot(
      productosRef,
      (querySnapshot) => {
        const productosArray = [];
        querySnapshot.forEach((doc) => {
          productosArray.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productosArray);
      },
      (error) => {
        console.error(error);
      }
    );
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
