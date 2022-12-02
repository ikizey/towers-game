import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import papirus from '../Assets/papirus.jpg';
import usePlayer from '../hooks/usePlayer';

const Home = () => {
    const nameRef = useRef();
    const navigate = useNavigate();
    const { saveName } = usePlayer();

    // console.log(nameRef.current.value);
    const playHandler = () => {
        if (nameRef.current.value) {
            saveName(nameRef.current.value);
            navigate('/lobby');
            return;
        }
        alert('Enter name, Please!');
    };

    return (
        <div
            style={{
                backgroundImage: `url(${papirus})`,
            }}
            className='bg-no-repeat bg-cover w-full flex flex-col h-screen'
        >
            <div className='bg-orange-300'>
                <p className='pb-6 text-center text-6xl text-rose-700 font-bold'>
                    Tower Game
                </p>
            </div>
            <div className='text-center pt-12'>
                <input
                    type='text'
                    ref={nameRef}
                    placeholder='Enter name'
                    className='h-14 text-3xl placeholder:font-bold bg-transparent border-y-4 border-y-orange-300 rounded-md px-4 text-center font-bold'
                />
            </div>
            <div className='flex justify-center'>
                <div className='pt-6 flex justify-center  text-8xl font-bold'>
                    <button
                        onClick={playHandler}
                        className='font-bold text-10xl p-3 text-yellow-600  hover:text-red-600'
                    >
                        Play
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
