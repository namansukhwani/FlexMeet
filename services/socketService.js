import { createContext, useContext } from 'react';

export const SocketContext = createContext(null);

export const useWebsocket = () => {
    const socket = useContext(SocketContext)
    return socket
}