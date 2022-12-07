import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { socket } from '../socket.config.js';
import { ConnectionHandler } from '../handlers/connectionHandler';
import { toastConfig } from '../toastConfig';
import { PlayerContext } from './playerContext.jsx';

export const SOCKET_ON = Object.freeze({
  ERROR: 'error',
  MESSAGE: 'message',
  JOIN_ROOM: 'join-room',
});

export const SOCKET_OUT = Object.freeze({
  MESSAGE: 'message',
});

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const [roomId, setRoomId] = useState('');
  const { playerName, playerId } = useContext(PlayerContext);
  const sendData = (type, data) => {
    //! add type check
    socket.emit(type, data);
  };
  console.log('socketcontext');
  const emitMe = () => {
    socket.emit('lobby', { name: playerName, uid: playerId });
    console.log('lobby');
  };

  useEffect(() => {
    socket.on(SOCKET_ON.JOIN_ROOM, ({ roomId }) => {
      setRoomId(roomId);
    });

    socket.on('welcome', () => {
      socket.emit('hello', {});
      console.log('welcome');
      // }
    });
    //* error must be a string
    socket.on(SOCKET_ON.ERROR, ({ error }) => {
      toast.error(error, toastConfig);
    });
    //* message must be a string
    socket.on(SOCKET_ON.MESSAGE, ({ message }) => {
      toast.success(message, toastConfig);
    });

    return () => {
      socket.off(SOCKET_ON.ERROR);
      socket.off(SOCKET_ON.MESSAGE);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ roomId, sendData, emitMe }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
