import React from 'react';
import Card from '../Card/Card';

const PlayerHand = ({ cardIds }) => {
  return (
    <div className='flex w-full'>
      {cardIds.map((cardId) => (
        <Card key={cardId} id={cardId} />
      ))}
    </div>
  );
};

export default PlayerHand;
