"use client";
import { createContext, useContext, useMemo } from "react";
import { Socket, io } from "socket.io-client";

type GlobalContextType = { socket: Socket | null };

const initialContext: GlobalContextType = {
  socket: null,
};

const GlobalContext = createContext<GlobalContextType>(initialContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useMemo(() => io("localhost:8000"), []);

  return (
    <GlobalContext.Provider value={{ socket }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to consume the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === null) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
