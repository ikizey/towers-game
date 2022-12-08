import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket.config.js';
import { PlayerContext } from './playerContext.jsx';

export const SOCKET_ON = Object.freeze({
  JOIN_ROOM: 'join-room',
});

export const SOCKET_OUT = Object.freeze({
  MESSAGE: 'message',
});

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();
  const { playerName, playerId } = useContext(PlayerContext);

  //*LobbyStates
  const [lobbyPlayersList, setLobbyPlayersList] = useState([]);
  const [lobbyGames, setLobbyGames] = useState([]);
  //*preGameStates:
  const [preGameId, setPreGameId] = useState('');
  const [preGameName, setPreGameName] = useState('');
  const [preGamePlayers, setPreGamePlayers] = useState([]);
  const [preGameIsAdmin, setPreGameIsAdmin] = useState(false);
  const [preGamePlayersToStart, setPreGamePlayersToStart] = useState(undefined);
  const [preGameIsReady, setPreGameIsReady] = useState(false);
  const [preGameIsPrivate, setPreGameIsPrivate] = useState(false);
  //*end of preGameState.

  const sendData = (type, data) => {
    //! add type check
    socket.emit(type, data);
  };

  const emitMe = () => {
    socket.emit('enters-lobby', { name: playerName, uid: playerId });
  };

  //*Lobby
  const listPreGames = () => {
    sendData('pregames-list-public', {});
  };

  const createPreGame = (name, playersAmount, isPrivate) => {
    setPreGameName(name);
    setPreGamePlayersToStart(playersAmount);
    setPreGameIsPrivate(isPrivate);
    sendData('pregame-create', { name, playersAmount, isPrivate });
  };

  const joinPreGame = (preGameId) => {
    sendData('pregame-join', { preGameId });
  };

  //* --Lobby

  //*PreGame
  const leavePreGame = () => {
    sendData('pregame-leave', {});
  };

  const startGame = () => {
    sendData('start-game', {});
  };

  //* --PreGame

  useEffect(() => {
    socket.on(SOCKET_ON.JOIN_ROOM, ({ roomId }) => {
      setRoomId(roomId);
    });

    socket.on('welcome', () => {
      socket.emit('hello', {});
      // }
    });
    //*Any
    socket.on('no-name', () => {
      navigate('/');
    });

    //*Lobby
    socket.on('pregames-public-list', ({ gameList }) => {
      setLobbyGames(gameList);
    });

    socket.on('players-all', ({ players }) => {
      setLobbyPlayersList(players); //{id, name, status}
    });

    //* --Lobby

    //*PreGame
    socket.on('pregames-public-list', ({ gameList }) => {
      setLobbyGames(gameList);
    });

    socket.on('pre-game-created', ({ name, id, playersToStart }) => {
      setPreGameName(name);
      setPreGameId(id);
      setPreGameIsAdmin(true);
      setPreGamePlayersToStart(playersToStart);
      setPreGamePlayers((prevState) => {
        if (prevState.findIndex((player) => player.id === playerId) === -1) {
          return [...prevState, { id: playerId, name: playerName }];
        } else {
          return [...prevState];
        }
      });
    });

    socket.on('pre-game-is-full', () => {
      navigate('/lobby');
    });

    socket.on('pre-game-new-player', ({ id, name }) => {
      setPreGamePlayers((prevState) => {
        if (prevState.findIndex((player) => player.id === id) === -1) {
          return [...prevState, { id, name }];
        } else {
          return [...prevState];
        }
      });
    });

    socket.on('pre-game-name', ({ id, name }) => {
      setPreGameId(id);
      setPreGameName(name);
    });

    socket.on('pre-game-ready', () => {
      setPreGameIsReady(true);
    });

    socket.on('pre-game-admin-left', () => {
      setPreGameId('');
      setPreGameName('');
      setPreGamePlayers([]);
      setPreGameIsAdmin(false);
      setPreGamePlayersToStart(undefined);
      setPreGameIsReady(false);
      navigate('/lobby');
    });

    socket.on('pre-game-left', () => {
      setPreGameId('');
      setPreGameName('');
      setPreGamePlayers([]);
      setPreGameIsAdmin(false);
      setPreGamePlayersToStart(undefined);
      setPreGameIsReady(false);
      navigate('/lobby');
    });

    socket.on('pre-game-player-left', ({ id, name }) => {
      const playerIndex = preGamePlayers.findIndex(
        (player) => player.id === id
      );
      setPreGamePlayers((prev) => [
        ...prev.slice(0, playerIndex),
        ...prev.slice(playerIndex),
      ]);
    });

    socket.on('pre-game-not-ready', () => {
      setPreGameIsReady(false);
    });
    //* --PreGame
    return () => {
      socket.off(SOCKET_ON.ERROR);
      socket.off(SOCKET_ON.MESSAGE);
      //...
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        roomId,
        sendData,
        emitMe,

        lobbyPlayersList,
        lobbyGames,
        listPreGames,
        createPreGame,
        joinPreGame,

        preGameId,
        preGameName,
        preGamePlayers,
        preGameIsAdmin,
        preGamePlayersToStart,
        preGameIsReady,
        preGameIsPrivate,
        leavePreGame,
        startGame,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
