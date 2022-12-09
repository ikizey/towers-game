import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import papirus from '../Assets/papirus.jpg';
import { SocketContext } from '../store/SocketContext';
import CreateGame from '../components/CreateGame';

const Lobby = () => {
  const [gameSelected, setGameSelected] = useState();
  const { lobbyGames, lobbyPlayersList, listPreGames } =
    useContext(SocketContext);
  const [createGames, setCreateGames] = useState(false);

  const { emitMe, joinPreGame } = useContext(SocketContext);

  const gameHandler = () => {
    setCreateGames(true);
  };

  const selectHandler = (gameId) => {
    gameSelected === gameId
      ? setGameSelected(undefined)
      : setGameSelected(gameId);
  };

  const joinHandler = () => {
    gameSelected && joinPreGame(gameSelected);
  };

  useEffect(() => {
    emitMe();
    listPreGames();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${papirus})`,
      }}
      className='z-10 bg-no-repeat bg-cover w-full flex flex-col h-screen p-8'
    >
      <header>
        <p className='z-10 pb-6 text-center text-5xl text-rose-700 font-bold'>
          Tower Game
        </p>
      </header>
      <div
        className={`z-10 flex flex-1 justify-evenly ${
          createGames ? 'blur-sm' : 'blur-none'
        }`}
      >
        <section>
          <div className='z-10 flex flex-1 gap-6'>
            <button
              onClick={gameHandler}
              className='p-4 text-2xl leading-6 rounded-3xl border border-red-800 w-40 block text-center hover:bg-red-400 font-bold hover:scale-110 ease-out duration-200'
            >
              Create
            </button>

            <div
              className='p-4 text-2xl leading-6 rounded-3xl border border-red-800 w-40 block text-center  hover:bg-red-400 font-bold hover:scale-110 ease-out duration-200'
              onClick={joinHandler}
            >
              Join
            </div>

            <div className='p-4 text-2xl leading-6 rounded-3xl border border-red-800 w-40 block text-center  hover:bg-red-400 font-bold hover:scale-110 ease-out duration-200'>
              Queue
            </div>
          </div>
          <div className='z-10 mt-3 text-center p-4 text-2xl leading-6 rounded-3xl border border-red-800'>
            <p>Statistic</p>
          </div>
          <div className='z-10 flex grow mt-3 text-center p-4 text-2xl leading-6 rounded-3xl border border-red-800'>
            <ul>
              {lobbyGames.length > 0 ? (
                lobbyGames.map((game) => (
                  <li
                    key={game.id}
                    className={`border-b-2 border-stone-500 cursor-pointer hover:font-bold ${
                      gameSelected === game.id ? 'bg-blue-500' : ''
                    }`}
                    onClick={(_) => {
                      selectHandler(game.id);
                    }}
                  >
                    <span>{game.name}</span>
                    <span>
                      {game.playersAmount}/{game.playersToStart}
                    </span>
                  </li>
                ))
              ) : (
                <div>No Games Yet</div>
              )}
            </ul>
          </div>
        </section>
        <section className='z-10 border border-red-700 block w-1/3 rounded-3xl p-4 text-4xl font-bold'>
          <p className='font-bold text-3xl text-orange-600'>Players</p>
          <ul>
            {lobbyPlayersList.map((player) => (
              <li key={player.id}>
                <div className='flex justify-between'>
                  <span>{player.name}</span> <span>{player.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      {createGames && <CreateGame />}
    </div>
  );
};

export default Lobby;
