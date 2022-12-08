import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import CreateGame from './pages/CreateGame';
import Game from './pages/Game';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import Queue from './pages/Queue';
import Join from './pages/Join';

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='lobby' element={<Lobby />} />
          <Route path='create-game' element={<CreateGame />} />
          <Route path='queue' element={<Queue />} />
          <Route path='game' element={<Game />} />
          <Route path='join' element={<Join />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Fragment>
  );
};

export default App;
