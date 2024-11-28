import React, { createContext, useState, ReactNode } from "react";

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

  return (
    <WSContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </WSContext.Provider>
  );
};
