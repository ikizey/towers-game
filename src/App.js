import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { PAGE } from './pages/page';
import Game from './pages/Game';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import Queue from './pages/Queue';
import Join from './pages/Join';

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path={PAGE.HOME} element={<Home />} />
        <Route path={PAGE.LOBBY} element={<Lobby />} />
        <Route path={PAGE.QUEUE} element={<Queue />} />
        <Route path={PAGE.GAME} element={<Game />} />
        <Route path={PAGE.PRE_GAME} element={<Join />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  );
};

export default App;
