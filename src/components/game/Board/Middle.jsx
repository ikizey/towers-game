import React from 'react';
import Deck from '../Deck';
import GraveYard from '../GraveYard';

const Middle = () => {
  return (
    <div className='flex justify-around flex-1'>
      <Deck />
      <GraveYard />
    </div>
  );
};

export default Middle;
