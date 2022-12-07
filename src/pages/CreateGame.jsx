import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreategame from '../hooks/useCreategame';

const CreateGame = () => {
    const [countPlayer, setCountPlayer] = useState('2');
    const [gameCategory, setGameCategory] = useState('Public');
    const refName = useRef();
    const navigate = useNavigate();
    const { saveOptions } = useCreategame();

    let category = ['Public', 'Private'];
    let players = ['2', '3', '4'];

    const playerHandler = (event) => {
        setCountPlayer(event.target.value);
    };

    const categoryHandler = (event) => {
        setGameCategory(event.target.value);
    };

    const formHandler = () => {
        console.log(refName.current.value);
        console.log(countPlayer);
        console.log(gameCategory);
        // saveOptions()
        navigate('/join');
    };

    return (
        <div className='w-2/5 h-1/3 bg-yellow-200 z-50 absolute top-1/3 left-1/4 border-red-700 border-2 rounded-3xl p-8 backdrop-blur-sm'>
            <form onSubmit={formHandler}>
                <div>
                    <label className='text-2xl font-bold mr-5'>
                        Name's Game
                    </label>
                    <input
                        className='border h-10 pl-3 text-xl border-orange-600 bg-yellow-200  text-red-800 font-bold uppercase'
                        type='text'
                        ref={refName}
                    />
                    <div className='mt-12 flex gap-8 items-center'>
                        <p className='text-2xl font-bold'>Players</p>
                        {players.map((item) => (
                            <div
                                key={item}
                                className='relative focus:outline-none'
                            >
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
                                            countPlayer === item
                                                ? 'bg-red-500'
                                                : ''
                                        }`}
                                    >
                                        {item}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className='mt-12 flex gap-8 items-center'>
                            <p className='text-2xl font-bold'>Category</p>
                            {category.map((item) => (
                                <div
                                    key={item}
                                    className='relative focus:outline-none'
                                >
                                    <label>
                                        <input
                                            type='radio'
                                            name='category'
                                            value={item}
                                            className='hidden'
                                            onChange={categoryHandler}
                                            checked={countPlayer === item}
                                        />
                                        <span
                                            className={`w-28 h-10 border rounded-3 border-red-500 font-bold text-xl cursor-pointer flex items-center justify-center ${
                                                gameCategory === item
                                                    ? 'bg-red-500'
                                                    : ''
                                            }`}
                                        >
                                            {item}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex justify-end'>
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
    );
};

export default CreateGame;
