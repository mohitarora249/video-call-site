"use client";
import { createContext, useContext, useState } from "react";

type GlobalContextType = {};

const initialContext: GlobalContextType = {};

const GlobalContext = createContext<GlobalContextType>(initialContext);

// Create a provider component
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

// Custom hook to consume the context
export const useGlobalContext = () => useContext(GlobalContext);
