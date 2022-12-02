import React from 'react';
import papirus from '../Assets/papirus.jpg';
import usePlayer from '../hooks/usePlayer';

const Lobby = () => {
    const { playerId, playerName } = usePlayer();

    return (
        <div
            style={{
                backgroundImage: `url(${papirus})`,
            }}
            className='bg-no-repeat bg-cover w-full flex flex-col h-screen p-8'
        >
            <header>
                <p className='pb-6 text-center text-5xl text-rose-700 font-bold'>
                    Tower Game
                </p>
            </header>
            <div className='flex flex-1 justify-evenly'>
                <section>
                    <div className='flex flex-1 gap-6'>
                        <a
                            href='#'
                            className='p-4 text-2xl leading-6 rounded-3xl border border-red-800 w-40 block text-center hover:bg-red-400 font-bold hover:scale-110 ease-out duration-200'
                        >
                            Create
                        </a>

                        <a
                            href='#'
                            className='p-4 text-2xl leading-6 rounded-3xl border border-red-800 w-40 block text-center  hover:bg-red-400 font-bold hover:scale-110 ease-out duration-200'
                        >
                            Join
                        </a>

                        <a
                            href='#'
                            className='p-4 text-2xl leading-6 rounded-3xl border border-red-800 w-40 block text-center  hover:bg-red-400 font-bold hover:scale-110 ease-out duration-200'
                        >
                            Queue
                        </a>
                    </div>
                    <div className='mt-3 text-center p-4 text-2xl leading-6 rounded-3xl border border-red-800'>
                        <p>Statistic</p>
                    </div>
                    <div className='flex grow mt-3 text-center p-4 text-2xl leading-6 rounded-3xl border border-red-800'>
                        <ul>
                            <li className='border-b-2 border-stone-500'>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                        </ul>
                    </div>
                </section>
                <section className='border border-red-700 block w-1/3 rounded-3xl p-4 text-4xl font-bold'>
                    <p className='font-bold text-3xl text-orange-600'>
                        Players
                    </p>
                    <ul>
                        <li>
                            {playerName} {playerId}
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Lobby;
