import { useState } from 'react';

const useCreategame = () => {
    const [nameGame, setNameGame] = useState();
    const [playersGame, setPlayersGame] = useState();
    const [categoryGame, setCategoryGame] = useState();

    const saveOptions = (game, players, category) => {
        setNameGame(game);
        setPlayersGame(players);
        setCategoryGame(category);
    };

    return { nameGame, playersGame, categoryGame, saveOptions };
};

export default useCreategame;
