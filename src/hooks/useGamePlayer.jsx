import { useState } from 'react';
import useTowers from './useTowers';

const useGamePlayer = () => {
  const [playerId, setPlayerId] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [playerIndex, setPlayerIndex] = useState();
  const [playerHand, setPlayerHand] = useState([]);
  const {
    towers: playerTowers,
    towersAddCards: playerTowersAddCards,
    towersRemoveCards: playerTowersRemoveCards,
    towersDestroy: playerTowersDestroy,
  } = useTowers();

  const handAddCards = (...cardIds) => {
    setPlayerHand((prev) => [...prev, ...cardIds]);
  };

  const handRemoveCards = (...cardIndices) => {
    setPlayerHand((prev) => {
      const newCards = [...prev];
      cardIndices.forEach((cardIndex) => {
        newCards.splice(cardIndex, 1);
      });
      return newCards;
    });
  };

  return {
    playerId,
    playerName,
    playerIndex,
    setPlayerId,
    setPlayerName,
    setPlayerIndex,

    playerHand,
    handAddCards,
    handRemoveCards,

    playerTowers,
    playerTowersAddCards,
    playerTowersRemoveCards,
    playerTowersDestroy,
  };
};

export default useGamePlayer;
