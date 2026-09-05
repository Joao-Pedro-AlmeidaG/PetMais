import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [purchases, setPurchases] = useState([]);

  const registerPurchases = useCallback((cartItems) => {
    const dataDaCompra = new Date().toISOString();
    const records = cartItems.map((item) => ({
      nomeProduto: item.nome,
      preco: item.preco,
      dataDaCompra,
    }));
    setPurchases((prev) => [...prev, ...records]);
    return records;
  }, []);

  const value = useMemo(
    () => ({ purchases, registerPurchases }),
    [purchases, registerPurchases]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders deve ser usado dentro de um OrdersProvider');
  return ctx;
}
