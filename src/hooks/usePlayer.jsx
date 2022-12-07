import { useState } from 'react';
import { nanoid } from 'nanoid';

const PLAYER = Object.freeze({
  ID: 'player-id',
  NAME: 'player-name',
});

const usePlayer = () => {
  const [playerId, setPlayerId] = useState(
    localStorage.getItem(PLAYER.ID) || nanoid
  );
  const [playerName, setPlayerName] = useState(
    localStorage.getItem(PLAYER.NAME) || ''
  );

  const savePlayerId = (id, callback, ...args) => {
    setPlayerId(id);
    localStorage.setItem(PLAYER.ID, id);

    if (callback) {
      callback(...args);
    }
  };

  const saveName = (name, callback, ...args) => {
    setPlayerName(name);
    localStorage.setItem(PLAYER.NAME, name);

    if (callback) {
      callback(...args);
    }
  };

  return { playerId, playerName, saveName, savePlayerId };
};

export default usePlayer;
