import React from 'react';
import { TbArrowBigUpLines } from 'react-icons/tb';

const TopSlot = ({ isPresent }) => {
  const color = isPresent ? 'text-gray-200' : 'text-gray-800 opacity-60';
  return <TbArrowBigUpLines className={`${color}`} />;
};

export default TopSlot;
