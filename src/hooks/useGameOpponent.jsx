import { useState } from 'react';
import useTowers from './useTowers';

const useGameOpponent = (index = -1) => {
  const [opponentId, setOpponentId] = useState(0);
  const [opponentName, setOpponentName] = useState('');
  const [opponentIndex, setOpponentIndex] = useState(index);
  const [opponentHand, setOpponentHand] = useState([]);
  const { towers, towersAddCards, towersRemoveCards, towersDestroy } =
    useTowers();

  const handAddCards = (amount = 1) => {
    setOpponentHand((prev) => [...new Array(prev.length + amount)]);
  };

  const handRemoveCards = (amount = 1) => {
    setOpponentHand((prev) => [...new Array(prev.length - amount)]);
  };

  return {
    opponentId,
    opponentName,
    opponentIndex,
    setOpponentId,
    setOpponentName,
    setOpponentIndex,

    opponentHand,
    handAddCards,
    handRemoveCards,

    towers,
    towersAddCards,
    towersRemoveCards,
    towersDestroy,
  };
};

export default useGameOpponent;
