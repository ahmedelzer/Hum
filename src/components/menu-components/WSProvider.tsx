// WSContext.tsx
import React, { createContext, useContext, useState } from "react";

// Create context
export const CartWSContext = createContext(null);

// Context provider component
export const WSProvider = ({ children }) => {
  const [_wsMessageCart, setWSMessageCart] = useState(null);
console.log("WSProvider")
  return (
    <CartWSContext.Provider value={{ _wsMessageCart, setWSMessageCart }}>
      {children}
    </CartWSContext.Provider>
  );
};

// Custom hook to consume the context
export const useCartWS = () => useContext(CartWSContext);
