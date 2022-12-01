import React from 'react';
import { NavLink } from 'react-router-dom';
import papirus from '../Assets/papirus.jpg';

const Home = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${papirus})`,
            }}
            className='bg-no-repeat bg-cover w-full flex flex-col h-screen'
        >
            <div className='bg-gray-200'>
                <p className='pb-6 text-center text-6xl text-rose-700 font-bold'>
                    Tower Game
                </p>
            </div>
            <div className='text-center pt-12'>
                <input
                    type='text'
                    placeholder='Enter name'
                    className='h-14 text-3xl placeholder:font-bold bg-transparent border border-orange-300 rounded-md px-4 text-center font-bold'
                />
            </div>
            <div className='flex justify-center'>
                <div className='pt-6 flex justify-center  text-8xl font-bold'>
                    <NavLink
                        className='font-bold text-10xl p-3 text-yellow-600  hover:text-red-600'
                        to='/lobby'
                    >
                        Play
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Home;
