import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const updateToLocalStorage = (state) => {
    window.localStorage.setItem("cart", JSON.stringify(state));
  };
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart")) || []
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [tempQuantities, setTempQuantities] = useState({});

  function addToCart(product) {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      const additionalQuantity = tempQuantities[product.id] || 1;
      newCart[productInCartIndex].quantity += additionalQuantity;

      delete tempQuantities[product.id];
      updateToLocalStorage(newCart);
      setCart(newCart);
      return newCart;
    }

    const newState = [
      ...cart,
      {
        ...product,
        quantity: tempQuantities[product.id] || 1,
      },
    ];
    delete tempQuantities[product.id];
    updateToLocalStorage(newState);
    setCart(newState);
    return newState;
  }
  function updateProductQuantity(product, quantityChange) {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      const newQuantity = Math.max(
        newCart[productInCartIndex].quantity + quantityChange,
        0
      );
      newCart[productInCartIndex].quantity = newQuantity;
      applyCartChanges(newCart);
    } else {
      setTempQuantities((prevQuantities) => {
        const newTempQuantity = Math.max(
          (prevQuantities[product.id] || 0) + quantityChange,
          0
        );
        return {
          ...prevQuantities,
          [product.id]: newTempQuantity,
        };
      });
    }
  }

  const removeFromCart = (id) => {
    const newState = cart.filter((item) => item.id !== id);
    setCart(newState);
    updateToLocalStorage(newState);
    return newState;
  };

  function applyCartChanges(newCart) {
    updateToLocalStorage(newCart);
    setCart(newCart);
  }
  const clearCart = () => {
    setCart([]);
    updateToLocalStorage([]);
  };
  const checkProductInCart = (product) =>
    cart.some((item) => item.id === product.id);

  const getQuantity = (productId) => {
    const productInCartIndex = cart.findIndex((item) => item.id === productId);
    if (productInCartIndex >= 0) {
      return cart[productInCartIndex].quantity;
    }

    return tempQuantities[productId] || 0;
  };

  useEffect(() => {
    const calculateTotalItems = (items) => {
      return items.reduce((sum, item) => sum + item.quantity, 0);
    };

    const calculateTotalPrice = (items) => {
      const total = items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );
      return parseFloat(total.toFixed(2));
    };

    const totalPrice = calculateTotalPrice(cart);
    setTotalPrice(totalPrice);

    const totalItems = calculateTotalItems(cart);
    setCartCount(totalItems);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        tempQuantities,
        totalPrice,
        cartCount,
        addToCart,
        removeFromCart,
        checkProductInCart,
        clearCart,
        updateProductQuantity,
        getQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
