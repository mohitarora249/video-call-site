import React, { createContext, useMemo, useContext } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: null | Socket;
};

type Props = {
  children: React.ReactNode;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
});

export const useSocket = () => useContext(SocketContext);

/**
 * Create a SocketProvider component that establishes a socket connection to "localhost:8000" using Socket.IO.
 *
 * @param {Props} children - The child elements to be rendered within the SocketProvider.
 * @return {ReactNode} The SocketProvider component with the established socket connection.
 */
export const SocketProvider = ({ children }: Props) => {
  const socket = useMemo(() => io("localhost:8000"), []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
