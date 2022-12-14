import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket.config.js';
import { PlayerContext } from './playerContext.jsx';
import { PAGE } from '../pages/page';
import { useCallback } from 'react';
import usePreGame from '../hooks/usePreGame.jsx';

export const SOCKET_ON = Object.freeze({
  JOIN_ROOM: 'join-room',
});

export const SOCKET_OUT = Object.freeze({
  MESSAGE: 'message',
});

const GAME_MSG = Object.freeze({
  NAME_ORDER_EXCHANGE: 'new-game-name-order-exchange',
  NEW_TURN: 'new-turn',
  PLAYER_GOT_CARDS: 'player-got-cards',
  PLAYER_LOST_CARDS: 'player-lost-cards',
  CARDS_DISCARDED: 'cards-discarded',
  CARD_PLAYED: 'card-played',
  WAR_CRY: 'war-cry',
  GROUP: 'group',
  GROUP_FAILED: 'group-failed',
  CARD_LEAVE_TOWER: 'card-leave-tower',
  PLAYER_GOT_ENG_CARDS: 'eng-got-cards',
});

const PLAYER_MSG = Object.freeze({
  NEW_PHASE: 'new-phase',
  CARDS_FROM_DECK: 'cards-from-deck',
  GROUP_NONE: 'group-none',
  GROUP_ENGINEER: 'group-engineer',
  GROUP_ORACLE: 'group-oracle',
  GROUP_WORKER: 'group-worker',
  GROUP_MAGE: 'group-mage',
  GROUP_BOMBER: 'group-bomber',
  GROUP_SABOTEUR: 'group-saboteur',
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
  const {
    preGameId,
    setPreGameId,
    preGameName,
    setPreGameName,
    preGamePlayers,
    setPreGamePlayers,
    preGameIsAdmin,
    setPreGameIsAdmin,
    preGamePlayersToStart,
    setPreGamePlayersToStart,
    preGameIsReady,
    setPreGameIsReady,
    preGameIsPrivate,
    setPreGameIsPrivate,
  } = usePreGame();
  //*end of preGameStates.

  //*gameStates
  const [gamePlayers, setGamePlayers] = useState([]);
  const [gameCurrentPlayerIndex, setGameCurrentPlayerIndex] = useState();
  const [gamePlayersCards, setGamePlayersCards] = useState([]);
  const [gameGraveyard, setGameGraveyard] = useState([]);
  const [gamePlayerTowersSlots, setGamePlayerTowersSlots] = useState([]); //[[{id, index},...],...] //?
  const [gameWarCryPlayerIndex, setGameWarCryPlayerIndex] = useState(-1);
  const [gameWarCryRace, setGameWarCryRace] = useState(-1);
  const [gamePlayerHand, setPlayerHand] = useState([]);
  const [gamePlayerEngHand, setPlayerEngHand] = useState([]);
  const [gameActiveGroup, setGameActiveGroup] = useState(-1);
  const [gameCanPlay, setGameCanPlay] = useState([]);
  const [gameEnemyTargets, setGameEnemyTargets] = useState([]);
  //* --gameStates

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
  const leavePreGame = useCallback(() => {
    sendData('pregame-leave', {});
  }, []);

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

    //*Game

    socket.on(GAME_MSG.NAME_ORDER_EXCHANGE, ({ id, name }) => {
      setGamePlayers(id, name);
    });
    socket.on(GAME_MSG.NEW_TURN, ({ playerIndex }) => {
      setGameCurrentPlayerIndex(playerIndex);
    });
    socket.on(GAME_MSG.PLAYER_GOT_CARDS, ({ playerIndex, amount }) => {
      setGamePlayersCards();
    }); //TODO!
    socket.on(GAME_MSG.PLAYER_LOST_CARDS, ({ playerIndex, cardIndices }) => {
      setGamePlayersCards();
    }); //TODO!
    socket.on(GAME_MSG.CARDS_DISCARDED, ({ cardIds }) => {
      setGameGraveyard((prev) => [...prev, ...cardIds]);
    });
    socket.on(
      GAME_MSG.CARD_PLAYED,
      ({ playerIndex, cardIndex, targetSlotIndex, cardId }) => {}
    ); //TODO!
    socket.on(GAME_MSG.WAR_CRY, ({ playerIndex, race }) => {
      setGameWarCryPlayerIndex(playerIndex);
      setGameWarCryRace(race);
    });
    // socket.on(GAME_MSG.GROUP, () => {});
    socket.on(GAME_MSG.GROUP_FAILED, () => {}); //?
    socket.on(
      GAME_MSG.CARD_LEAVE_TOWER,
      ({ playerIndex, slotIndex, cardId }) => {}
    );
    socket.on(GAME_MSG.PLAYER_GOT_ENG_CARDS, ({ playerIndex, amount }) => {}); //wrong?
    // socket.on(PLAYER_MSG.NEW_PHASE, () => {});
    socket.on(PLAYER_MSG.CARDS_FROM_DECK, ({ cardIds }) => {
      setPlayerHand(cardIds);
    }); //TODO!
    socket.on(PLAYER_MSG.GROUP_NONE, ({ source }) => {
      setGameActiveGroup(source);
    }); //TODO!
    socket.on(PLAYER_MSG.GROUP_ENGINEER, ({ source }) => {
      setGameActiveGroup(source);
    }); //TODO!
    socket.on(PLAYER_MSG.GROUP_ORACLE, ({ source }) => {
      setGameActiveGroup(source);
    }); //TODO!
    socket.on(PLAYER_MSG.GROUP_WORKER, ({ source, canPlay }) => {
      setGameCanPlay(canPlay);
    }); //TODO!
    socket.on(PLAYER_MSG.GROUP_MAGE, ({ source, enemyTargets }) => {
      setGameEnemyTargets(enemyTargets);
    }); //TODO!
    socket.on(PLAYER_MSG.GROUP_BOMBER, ({ source, enemyTargets }) => {
      setGameEnemyTargets(enemyTargets);
    }); //TODO!
    socket.on(PLAYER_MSG.GROUP_SABOTEUR, ({ source, targets }) => {
      setGameEnemyTargets(targets);
    }); //TODO!
    //* --Game
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
