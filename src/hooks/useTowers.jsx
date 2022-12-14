import { useReducer } from 'react';

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

const useTowers = () => {
  const [towers, dispatchTowers] = useReducer(towersReducer, [
    ...new Array(15),
  ]);

  const towersAddCards = (slotIndex, cardId) => {
    const type = TOWER_ACTIONS.ADD;
    dispatchTowers({ type, slotIndex, cardId });
  };

  const towersRemoveCards = (slotIndex) => {
    const type = TOWER_ACTIONS.REMOVE;
    dispatchTowers({ type, slotIndex });
  };

  const towersDestroy = (slotIndex) => {
    const type = TOWER_ACTIONS.DESTROY;
    dispatchTowers({ type, slotIndex });
  };

  return { towers, towersAddCards, towersRemoveCards, towersDestroy };
};

export default useTowers;
