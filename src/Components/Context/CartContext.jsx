import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem('CARRITO')) || []
  );
  useEffect(() => {
    const newArray = [...cart];
    localStorage.setItem('CARRITO', JSON.stringify(newArray));
  }, [cart]);

  const addToCart = (selectedProduct) => {
    let dobbleProduct = isInCart(selectedProduct.id);
    if (dobbleProduct) {
      let newArray = cart.map((product) => {
        if (selectedProduct.id === product.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCart(newArray);
    } else {
      setCart([...cart, selectedProduct]);
    }
  };

  const isInCart = (id) => {
    return cart.some((elemento) => elemento.id === id);
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeProduct = (id) => {
    // Me fallaba porque le estaba haciendo un splice a cart que es un estado.
    const deletedProductIndex = cart.findIndex((product) => product.id === id);
    const newArray = [...cart];
    newArray.splice(deletedProductIndex, 1);
    setCart(newArray);
  };

  const getCartQuantity = () => {
    const total = cart.reduce((acc, element) => {
      return acc + element.quantity;
    }, 0);
    return total;
  };

  const getCartTotalPrice = () => {
    const total = cart.reduce((acc, element) => {
      return acc + element.quantity * element.price;
    }, 0);
    return total;
  };

  const getProductQuantityByID = (id) => {
    const filteredProduct = cart.find((product) => product.id === id);
    return filteredProduct?.quantity;
  };

  const addOneElement = (id) => {
    let newArray = cart.map((product) => {
      if (id === product.id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    setCart(newArray);
  };

  const minusOneElement = (id) => {
    const filteredProduct = cart.find((product) => product.id === id);
    if (filteredProduct.quantity > 0) {
      let newArray = cart.map((product) => {
        if (id === product.id) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
      setCart(newArray);
    }
  };

  const data = {
    cart,
    addToCart,
    clearCart,
    removeProduct,
    getCartQuantity,
    getCartTotalPrice,
    getProductQuantityByID,
    addOneElement,
    minusOneElement,
  };
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
