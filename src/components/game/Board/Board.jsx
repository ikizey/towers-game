import React from 'react';
import Middle from '../Board/Middle.jsx';
import Player from '../Players/Player';
import TopOpponent from '../Players/TopOpponent';

const Board = () => {
  return (
    <div className='w-screen h-screen'>
      <TopOpponent />
      <Middle />
      <Player />
    </div>
  );
};

export default Board;
