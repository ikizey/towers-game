import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { PAGE } from './pages/page';
import Game from './pages/Game';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import PreGame from './pages/PreGame';
import Queue from './pages/Queue';

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path={PAGE.HOME} element={<Home />} />
        <Route path={PAGE.LOBBY} element={<Lobby />} />
        <Route path={PAGE.QUEUE} element={<Queue />} />
        <Route path={PAGE.PRE_GAME} element={<PreGame />} />
        <Route path={PAGE.GAME} element={<Game />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  );
};

export default App;
