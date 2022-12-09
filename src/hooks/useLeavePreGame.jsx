import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SocketContext } from '../store/SocketContext';

const useLeavePreGame = () => {
  const { leavePreGame } = useContext(SocketContext);
  const location = useLocation();

  useEffect(() => () => leavePreGame, [location, leavePreGame]);
};

export default useLeavePreGame;
