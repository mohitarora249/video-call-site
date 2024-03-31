import { createContext, useContext, useState } from "react";

type GlobalContextType = {
  count: number;
  increment: () => void;
};

const initialContext: GlobalContextType = {
  count: 0,
  increment: () => {},
};

const GlobalContext = createContext<GlobalContextType>(initialContext);

// Create a provider component
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <GlobalContext.Provider value={{ count, increment }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to consume the context
export const useGlobalContext = () => useContext(GlobalContext);
