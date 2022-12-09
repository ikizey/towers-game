import React from 'react';
import PlayerHand from '../Hands/PlayerHand.jsx';
import PlayerTowers from '../Towers/PlayerTowers';

const Player = () => {
  return (
    <div className='flex flex-col'>
      <PlayerTowers />
      <PlayerHand cardIds={[1, 20, 50, 70, 100]} />
    </div>
  );
};

export default Player;
