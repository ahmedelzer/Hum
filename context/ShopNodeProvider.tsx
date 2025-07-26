// WSContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
export const ShopNodeContext = createContext(null);

// Context provider component
export const ShopNodeProvider = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState({});

  return (
    <ShopNodeContext.Provider
      value={{
        selectedNode,
        setSelectedNode,
      }}
    >
      {children}
    </ShopNodeContext.Provider>
  );
};

// Custom hook to consume the context
export const useShopNode = () => useContext(ShopNodeContext);
