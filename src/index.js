import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import PlayerContextProvider from './store/playerContext';
import SocketContextProvider from './store/SocketContext';
import NameGameContextProvider from './store/NameGameContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PlayerContextProvider>
      <SocketContextProvider>
        <NameGameContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NameGameContextProvider>
      </SocketContextProvider>
    </PlayerContextProvider>
  </React.StrictMode>
);
