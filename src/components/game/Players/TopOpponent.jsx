import React from 'react';
import TopOpponentHand from '../Hands/TopOpponentHand';
import TopOpponentTowers from '../Towers/TopOpponentTowers.jsx';
const TopOpponent = () => {
  return (
    <div className='flex flex-col'>
      <TopOpponentHand />
      <TopOpponentTowers />
    </div>
  );
};

export default TopOpponent;
