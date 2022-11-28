import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import CreateGame from './pages/CreateGame';
import Queue from './pages/Queue';
import Game from './pages/Game';

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='/lobby' element={<Lobby />} />
          <Route path='/create-game' element={<CreateGame />} />
          <Route path='/queue' element={<Queue />} />
          <Route path='/game' element={<Game />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
