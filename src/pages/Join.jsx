import React from 'react';
import { useContext } from 'react';
import papirus from '../Assets/papirus.jpg';
import { SocketContext } from '../store/SocketContext';

const Join = () => {
  const {
    preGameName,
    preGameId,
    preGamePlayers,
    preGameIsAdmin,
    preGamePlayersToStart,
    preGameIsReady,
    preGameIsPrivate,
  } = useContext(SocketContext);

  return (
    <div
      style={{
        backgroundImage: `url(${papirus})`,
      }}
      className='bg-no-repeat bg-cover w-full flex flex-col h-screen p-10'
    >
      <header>
        <p className='pb-6 text-center text-5xl text-rose-700 font-bold'>
          Tower Game
        </p>
      </header>
      <div className='flex flex-1 justify-evenly'>
        <section className='w-1/3 flex flex-col items-stretch h-full'>
          <div className='p-4 text-2xl leading-6 flex justify-between  w-full'>
            <p className='text-4xl font-bold'>Name's Game</p>
            <p>{preGameName}</p>
          </div>
          <div className='p-4 text-2xl leading-6 flex justify-between  w-full'>
            <p className='text-4xl font-bold'>Players</p>
            <p>{preGamePlayersToStart}</p>
          </div>
          <div className='p-4 text-2xl leading-6 flex justify-between  w-full grow'>
            <p className='text-4xl font-bold'>Category</p>
            <p>{preGameIsPrivate}</p>
          </div>
          {preGameIsReady && preGameIsAdmin && (
            <div className='text-4xl bg-orange-400 font-bold text-center border-2 border-red-700 rounded-xl shadow-lg shadow-current active:shadow-none active:scale-90'>
              START
            </div>
          )}
        </section>
        <section className='border border-red-700 block w-1/4 rounded-3xl p-4 text-4xl font-bold'>
          <p className='font-bold text-3xl text-orange-600'>Players</p>
          <ul>
            {preGamePlayers.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Join;
