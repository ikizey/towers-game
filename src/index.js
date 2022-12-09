import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import PlayerContextProvider from './store/playerContext';
import SocketContextProvider from './store/SocketContext';
import NameGameContextProvider from './store/NameGameContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HistoryRouter history={createBrowserHistory()}>
      <PlayerContextProvider>
        <SocketContextProvider>
          <NameGameContextProvider>
            <App />
          </NameGameContextProvider>
        </SocketContextProvider>
      </PlayerContextProvider>
    </HistoryRouter>
  </React.StrictMode>
);
