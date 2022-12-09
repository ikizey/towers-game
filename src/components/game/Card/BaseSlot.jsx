import React from 'react';
import { TbArrowBigTop } from 'react-icons/tb';

const BaseSlot = ({ isPresent }) => {
  const color = isPresent ? 'text-gray-200' : 'text-gray-800 opacity-60';
  return <TbArrowBigTop className={`${color}`} />;
};

export default BaseSlot;
