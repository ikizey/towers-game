import { useState } from 'react';
import useGraveyard from './useGameGraveyard';
import useGameOpponent from './useGameOpponent';
import useGamePlayer from './useGamePlayer';

const useGame = () => {
  const [gameId, setGameId] = useState();
  const [playersAmount, setPlayersAmount] = useState();

  const {
    opponentId: topOpponentId,
    opponentName: topOpponentName,
    opponentIndex: topOpponentIndex,
    setOpponentId: setTopOpponentId,
    setOpponentName: setTopOpponentName,
    setOpponentIndex: setTopOpponentIndex,

    opponentHand: topOpponentHand,
    handAddCards: topOpponentHandAddCards,
    handRemoveCards: topOpponentRemoveCards,

    towers: topOpponentTowers,
    towersAddCards: topOpponentTowerAddCards,
    towersRemoveCards: topOpponentTowerRemoveCards,
    towersDestroy: topOpponentTowerDestroy,
  } = useGameOpponent();

  const {
    opponentId: leftOpponentId,
    opponentName: leftOpponentName,
    opponentIndex: leftOpponentIndex,
    setOpponentId: setLeftOpponentId,
    setOpponentName: setLeftOpponentName,
    setOpponentIndex: setLeftOpponentIndex,

    opponentHand: leftOpponentHand,
    handAddCards: leftOpponentHandAddCards,
    handRemoveCards: leftOpponentRemoveCards,

    towers: leftOpponentTowers,
    towersAddCards: leftOpponentTowerAddCards,
    towersRemoveCards: leftOpponentTowerRemoveCards,
    towersDestroy: leftOpponentTowerDestroy,
  } = useGameOpponent();

  const {
    opponentId: rightOpponentId,
    opponentName: rightOpponentName,
    opponentIndex: rightOpponentIndex,
    setOpponentId: setRightOpponentId,
    setOpponentName: setRightOpponentName,
    setOpponentIndex: setRightOpponentIndex,

    opponentHand: rightOpponentHand,
    handAddCards: rightOpponentHandAddCards,
    handRemoveCards: rightOpponentRemoveCards,

    towers: rightOpponentTowers,
    towersAddCards: rightOpponentTowerAddCards,
    towersRemoveCards: rightOpponentTowerRemoveCards,
    towersDestroy: rightOpponentTowerDestroy,
  } = useGameOpponent();

  const [deck, setDeck] = useState(0);
  const deckRemoveCards = (amount) => {
    setDeck((prev) => prev - amount);
  };
  const deckAddCards = (amount) => {
    setDeck((prev) => prev + amount);
  };

  const { graveYard, graveyardAddCards, graveyardClear } = useGraveyard();

  const {
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
  } = useGamePlayer();

  return {
    gameId,
    setGameId,

    deck,
    deckRemoveCards,
    deckAddCards,

    graveYard,
    graveyardAddCards,
    graveyardClear,

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

    topOpponentId,
    topOpponentName,
    topOpponentIndex,
    setTopOpponentId,
    setTopOpponentName,
    setTopOpponentIndex,
    topOpponentHand,
    topOpponentHandAddCards,
    topOpponentRemoveCards,
    topOpponentTowers,
    topOpponentTowerAddCards,
    topOpponentTowerRemoveCards,
    topOpponentTowerDestroy,

    leftOpponentId,
    leftOpponentName,
    leftOpponentIndex,
    setLeftOpponentId,
    setLeftOpponentName,
    setLeftOpponentIndex,
    leftOpponentHand,
    leftOpponentHandAddCards,
    leftOpponentRemoveCards,
    leftOpponentTowers,
    leftOpponentTowerAddCards,
    leftOpponentTowerRemoveCards,
    leftOpponentTowerDestroy,

    rightOpponentId,
    rightOpponentName,
    rightOpponentIndex,
    setRightOpponentId,
    setRightOpponentName,
    setRightOpponentIndex,
    rightOpponentHand,
    rightOpponentHandAddCards,
    rightOpponentRemoveCards,
    rightOpponentTowers,
    rightOpponentTowerAddCards,
    rightOpponentTowerRemoveCards,
    rightOpponentTowerDestroy,

    playersAmount,
    setPlayersAmount,
  };
};

export default useGame;
