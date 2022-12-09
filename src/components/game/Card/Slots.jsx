import React from 'react';
import { TOWER_SLOTS } from '../../../models/TowerSlots';
import BaseSlot from './BaseSlot';
import MiddleSlot from './MiddleSlot';
import TopSlot from './TopSlot';

const Slots = ({ slots }) => {
  const top = slots.includes(TOWER_SLOTS.TOP);
  const middle = slots.includes(TOWER_SLOTS.MIDDLE);
  const base = slots.includes(TOWER_SLOTS.BASE);
  return (
    <div className='flex flex-col'>
      <TopSlot isPresent={top} />
      <MiddleSlot isPresent={middle} />
      <BaseSlot isPresent={base} />
    </div>
  );
};

export default Slots;
