import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCartFromStorage } from "../src/reducers/CartReducer";
import { loadProductsFromStorage } from "../src/reducers/ProductReducer";

// Define the shape of the WebSocket context
interface WSContextType {
  notifications: any;
  setNotifications: React.Dispatch<React.SetStateAction<any>>;
}

// Create the WebSocket context
export const WSContext = createContext<WSContextType>({
  notifications: [],
  setNotifications: () => {}, // Default no-op function
});

// WebSocket Context Provider
export const WS_Provider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(loadCartFromStorage());
    // dispatch(loadProductsFromStorage());
  }, [dispatch]);
  return (
    <WSContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </WSContext.Provider>
  );
};
