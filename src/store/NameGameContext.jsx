import { createContext, useState } from 'react';

export const NameGameContext = createContext();

const NameGameContextProvider = ({ children }) => {
  const [nameGame, setNameGame] = useState('');
  const [playersGame, setPlayersGame] = useState('');
  const [categoryGame, setCategoryGame] = useState('');

  const saveOptions = (game, players, category) => {
    setNameGame(game);
    setPlayersGame(players);
    setCategoryGame(category);
  };

  return (
    <NameGameContext.Provider
      value={{ nameGame, playersGame, categoryGame, saveOptions }}
    >
      {children}
    </NameGameContext.Provider>
  );
};

export default NameGameContextProvider;
