import React, { createContext, useContext, useMemo, useState, useCallback, useRef } from 'react';

const CartContext = createContext(null);

export function effectivePrice(product) {
  if (
    product.precoPromocional !== null &&
    product.precoPromocional !== undefined &&
    product.precoPromocional < product.precoAtual
  ) {
    return product.precoPromocional;
  }
  return product.precoAtual;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const nextId = useRef(1);


  const addToCart = useCallback((product) => {
    const cartItemId = `cart-${nextId.current}`;
    nextId.current += 1;
    setCartItems((prev) => [
      ...prev,
      {
        cartItemId,
        productId: product.id,
        nome: product.nome,
        tipo: product.tipo,
        preco: effectivePrice(product),
      },
    ]);
  }, []);

  const removeFromCart = useCallback((cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.preco, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, clearCart, total }),
    [cartItems, addToCart, removeFromCart, clearCart, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de um CartProvider');
  return ctx;
}
