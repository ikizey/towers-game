import React from 'react';
import { TbArrowBigUpLine } from 'react-icons/tb';

const MiddleSlot = ({ isPresent }) => {
  const color = isPresent ? 'text-gray-200' : 'text-gray-800 opacity-60';
  return <TbArrowBigUpLine className={`${color} `} />;
};

export default MiddleSlot;
