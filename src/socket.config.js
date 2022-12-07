import { io } from 'socket.io-client';

const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost';
const WS_PORT = process.env.REACT_APP_WS_PORT || '3001';
export const socket = io(`${WS_URL}:${WS_PORT}`);
