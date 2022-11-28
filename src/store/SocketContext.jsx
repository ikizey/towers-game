import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { toastConfig } from '../toastConfig';

const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost';
const WS_PORT = process.env.REACT_APP_WS_PORT || '3001';
const socket = io(`${WS_URL}:${WS_PORT}`);

export const SOCKET_ON = Object.freeze({
  ERROR: 'error',
  MESSAGE: 'message',
  ROOM: 'room',
});

export const SOCKET_OUT = Object.freeze({
  MESSAGE: 'message',
});

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const [roomId, setRoomId] = useState('');

  const sendData = (type, data) => {
    //! add type check
    socket.emit(type, data);
  };

  useEffect(() => {
    socket.on(SOCKET_ON, ({ roomId }) => {
      setRoomId(roomId);
    });
    //* error should be string
    socket.on(SOCKET_ON.ERROR, ({ error }) => {
      toast.error(error, toastConfig);
    });
    //* message should be string
    socket.on(SOCKET_ON.MESSAGE, ({ message }) => {
      toast.success(message, toastConfig);
    });

    return () => {
      socket.off(SOCKET_ON.ERROR);
      socket.off(SOCKET_ON.MESSAGE);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ roomId, sendData }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
