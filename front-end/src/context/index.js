import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { saveItem, getItem } from '../services/localStorage';

const Context = createContext();

const Provider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState('0.00');
  const [menuOpen, setMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (getItem('cart')) setCart(getItem('cart'));
  }, []);

  useEffect(() => {
    setTotalPrice(cart
      .reduce((acc, { price, quantity }) => acc + (price * quantity), 0)
      .toFixed(2));
  }, [cart]);
  // function calcTotalPrice() {
  //   setTotalPrice(cart
  //     .reduce((acc, { price, quantity }) => acc + (price * quantity), 0)
  //     .toFixed(2));
  // }

  function addToCart(product) {
    let newCart;
    if (cart.find(({ id }) => id === product.id)) {
      newCart = cart.map((prod) => {
        if (prod.id === product.id) prod.quantity += 1;
        return prod;
      });
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    saveItem('cart', newCart);
    setCart(newCart);
    // calcTotalPrice();
  }

  function removeFromCart(product) {
    if (!cart.find(({ id }) => id === product.id)) return;

    const newCart = cart.map((prod) => {
      if (prod.id === product.id) prod.quantity -= 1;
      // calcTotalPrice();
      return prod;
    });

    const filteredCart = newCart.filter(({ quantity }) => quantity > 0);
    saveItem('cart', filteredCart);
    setCart(filteredCart);
  }

  const contextValue = {
    menuOpen,
    setMenuOpen,
    cart,
    addToCart,
    removeFromCart,
    totalPrice,
    setTotalPrice,
    orders,
    setOrders,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Context, Provider };
