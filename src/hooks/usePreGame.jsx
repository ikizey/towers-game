import { useState } from 'react';

const usePreGame = () => {
  const [preGameId, setPreGameId] = useState('');
  const [preGameName, setPreGameName] = useState('');
  const [preGamePlayers, setPreGamePlayers] = useState([]);
  const [preGameIsAdmin, setPreGameIsAdmin] = useState(false);
  const [preGamePlayersToStart, setPreGamePlayersToStart] = useState(undefined);
  const [preGameIsReady, setPreGameIsReady] = useState(false);
  const [preGameIsPrivate, setPreGameIsPrivate] = useState(false);

  return {
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
  };
};

export default usePreGame;
