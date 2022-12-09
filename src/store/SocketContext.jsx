import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket.config.js';
import { PlayerContext } from './playerContext.jsx';
import { PAGE } from '../pages/page';

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

  const kickPlayer = (id) => {
    sendData('pre-game-kick', { clientUid: id });
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
      navigate(PAGE.HOME);
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
    });

    socket.on('pre-game-player-list', ({ players }) => {
      setPreGamePlayers(players);
    });

    socket.on('pre-game-name', ({ id, name, playersToStart }) => {
      setPreGameId(id);
      setPreGameName(name);
      setPreGamePlayersToStart(playersToStart);
      navigate(PAGE.PRE_GAME);
    });

    socket.on('pre-game-ready', () => {
      setPreGameIsReady(true);
    });

    socket.on('pre-game-not-ready', () => {
      setPreGameIsReady(false);
    });

    socket.on('pre-game-is-full', () => {
      setPreGameId('');
      setPreGameName('');
      setPreGamePlayers([]);
      setPreGameIsAdmin(false);
      setPreGamePlayersToStart(undefined);
      setPreGameIsReady(false);
      navigate(PAGE.LOBBY);
    });

    socket.on('pre-game-admin-left', () => {
      setPreGameId('');
      setPreGameName('');
      setPreGamePlayers([]);
      setPreGameIsAdmin(false);
      setPreGamePlayersToStart(undefined);
      setPreGameIsReady(false);
      navigate(PAGE.LOBBY);
    });

    socket.on('pre-game-left', () => {
      setPreGameId('');
      setPreGameName('');
      setPreGamePlayers([]);
      setPreGameIsAdmin(false);
      setPreGamePlayersToStart(undefined);
      setPreGameIsReady(false);
      navigate(PAGE.LOBBY);
    });

    socket.on('kicked-from-pre-game', () => {
      setPreGameId('');
      setPreGameName('');
      setPreGamePlayers([]);
      setPreGameIsAdmin(false);
      setPreGamePlayersToStart(undefined);
      setPreGameIsReady(false);
      navigate(PAGE.LOBBY);
    });

    //* --PreGame
    return () => {
      socket.off(SOCKET_ON.ERROR);
      socket.off(SOCKET_ON.MESSAGE);
      //...
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        kickPlayer,
        startGame,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
