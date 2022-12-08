import React, { useContext } from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { NameGameContext } from '../store/NameGameContext';
import { SocketContext } from '../store/SocketContext';
import ReactDOM from 'react-dom';

const category = [
  ['Public', false],
  ['Private', true],
];

const players = [2, 3, 4];

const CreateGame = () => {
  const { createPreGame } = useContext(SocketContext);

  const [countPlayer, setCountPlayer] = useState(2);
  const [isPrivate, setIsPrivate] = useState(false);
  const refName = useRef();
  const navigate = useNavigate();
  const { saveOptions } = useContext(NameGameContext);

  const playerHandler = (event) => {
    setCountPlayer(~~event.target.value);
  };

  const categoryHandler = (event) => {
    setIsPrivate(event.target.value === 'Private');
  };

  const formHandler = (event) => {
    event.preventDefault();
    saveOptions(refName.current.value, countPlayer, isPrivate);
    createPreGame(refName.current.value, countPlayer, isPrivate);

    navigate('/join');
  };

  return ReactDOM.createPortal(
    <div className='flex w-full h-full justify-center absolute items-center'>
      <div className='w-[600px] h-[300px] z-50 top-50 bg-yellow-200 border-red-700 border-2 rounded-3xl p-8 backdrop-blur-sm'>
        <form onSubmit={formHandler}>
          <div>
            <label className='text-2xl font-bold mr-5'>Name's Game</label>
            <input
              className='border h-10 pl-3 text-xl border-orange-600 bg-yellow-200  text-red-800 font-bold uppercase'
              type='text'
              ref={refName}
            />
            <div className='mt-10 flex gap-8 items-center'>
              <p className='text-2xl font-bold'>Players</p>
              {players.map((item) => (
                <div key={item} className='relative focus:outline-none'>
                  <label>
                    <input
                      type='radio'
                      name='players'
                      value={item}
                      className='hidden'
                      onChange={playerHandler}
                      checked={countPlayer === item}
                    />
                    <span
                      className={`w-12 h-12 border rounded-full border-red-500 font-bold text-xl cursor-pointer flex items-center justify-center ${
                        countPlayer === item ? 'bg-red-500' : ''
                      }`}
                    >
                      {item}
                    </span>
                  </label>
                </div>
              ))}
            </div>
            <div>
              <div className='mt-10  flex gap-8 items-center'>
                <p className='text-2xl font-bold'>Category</p>
                {category.map((item) => (
                  <div key={item} className='relative focus:outline-none'>
                    <label>
                      <input
                        type='radio'
                        name='category'
                        value={item[0]}
                        className='hidden'
                        onChange={categoryHandler}
                        checked={countPlayer === item[0]}
                      />
                      <span
                        className={`w-28 h-10 border rounded-3 border-red-500 font-bold text-xl cursor-pointer flex items-center justify-center ${
                          isPrivate === item[1] ? 'bg-red-500' : ''
                        }`}
                      >
                        {item}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex justify-between'>
              <button
                className='focus:bg-white focus:text-red-500  mt-5 text-2xl font-bold w-32 h-10 border-2  border-black rounded-3 flex justify-center bg-red-500 text-white'
                type='submit'
              >
                Cancel
              </button>
              <button
                className='focus:bg-white focus:text-red-500  mt-5 text-2xl font-bold w-32 h-10 border-2  border-black rounded-3 flex justify-center bg-red-500 text-white'
                type='submit'
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default CreateGame;
