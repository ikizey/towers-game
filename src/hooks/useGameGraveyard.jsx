import { useReducer } from 'react';

const GRAVEYARD_ACTIONS = Object.freeze({
  ADD: 'add',
  CLEAR: 'clear',
});

const emptyGraveyard = [];

const graveyardReducer = (state, action) => {
  switch (action.type) {
    case GRAVEYARD_ACTIONS.ADD: {
      return [...state, ...action.cardIds];
    }
    case GRAVEYARD_ACTIONS.CLEAR: {
      return emptyGraveyard;
    }
    default: {
      return [...state];
    }
  }
};

const useGraveyard = () => {
  const [graveYard, dispatch] = useReducer(graveyardReducer, emptyGraveyard);

  const graveyardAddCards = (...cardIds) => {
    const type = GRAVEYARD_ACTIONS.ADD;
    dispatch({ type, cardIds });
  };

  const graveyardClear = () => {
    const type = GRAVEYARD_ACTIONS.CLEAR;
    dispatch({ type });
  };

  return {
    graveYard,
    graveyardAddCards,
    graveyardClear,
  };
};

export default useGraveyard;
