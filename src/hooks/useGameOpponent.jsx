import { useReducer, useState } from 'react';

const TOWER_ACTIONS = Object.freeze({
  ADD: 'add',
  REMOVE: 'remove',
  DESTROY: 'destroy',
});

const towersReducer = (state, action) => {
  const newState = [...state];
  switch (action.type) {
    case TOWER_ACTIONS.ADD: {
      newState[action.slotIndex] = action.cardId;
      return newState;
    }
    case TOWER_ACTIONS.REMOVE: {
      newState[action.slotIndex] = undefined;
      return newState;
    }
    case TOWER_ACTIONS.DESTROY: {
      newState[action.slotIndex] = undefined;
      if (action.slotIndex % 3 === 1) {
        newState[action.slotIndex - 1] = undefined;
      }
      return newState;
    }
    default: {
      return newState;
    }
  }
};

const useGameOpponent = (index = -1) => {
  const [opponentId, setOpponentId] = useState(0);
  const [opponentName, setOpponentName] = useState('');
  const [opponentIndex, setOpponentIndex] = useState(index);
  const [opponentHand, setOpponentHand] = useState([]);
  const [opponentTowers, dispatchTowers] = useReducer(towersReducer, [
    ...new Array(15),
  ]);

  const handAddCards = (amount = 1) => {
    setOpponentHand((prev) => [...new Array(prev.length + amount)]);
  };

  const handRemoveCards = (amount = 1) => {
    setOpponentHand((prev) => [...new Array(prev.length - amount)]);
  };

  const towerAddCards = (slotIndex, cardId) => {
    const type = TOWER_ACTIONS.ADD;
    dispatchTowers({ type, slotIndex, cardId });
  };

  const towerRemoveCards = (slotIndex) => {
    const type = TOWER_ACTIONS.REMOVE;
    dispatchTowers({ type, slotIndex });
  };

  const towerDestroy = (slotIndex) => {
    const type = TOWER_ACTIONS.DESTROY;
    dispatchTowers({ type, slotIndex });
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

    opponentTowers,
    towerAddCards,
    towerRemoveCards,
    towerDestroy,
  };
};

export default useGameOpponent;
