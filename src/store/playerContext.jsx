import React, { createContext } from 'react';
import usePlayer from '../hooks/usePlayer.jsx';

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const { playerId, playerName, saveName, savePlayerId } = usePlayer();

  return (
    <PlayerContext.Provider
      value={{ playerId, playerName, saveName, savePlayerId }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
