import React from 'react';
import { ALL_CARDS } from '../../../models/AllCards';
import { RACE } from '../../../models/Race.js';
import Slots from './Slots';
import Group from './Group';

const Card = ({ id }) => {
  const card = ALL_CARDS[id];
  console.log(card);
  const bgColor = (race) => {
    if (race === RACE.ELF) return 'bg-green-500';
    if (race === RACE.HUMAN) return 'bg-blue-500';
    if (race === RACE.ORC) return 'bg-red-500';
    if (race === RACE.UNDEAD) return 'bg-purple-500';
  };
  return (
    <div
      className={`${bgColor(
        card.race
      )} w-24 h-24 border-1 border-gray-600 rounded-md overflow-hidden`}
    >
      <Slots slots={card.slots} />
      <Group group={card.group} />
    </div>
  );
};

export default Card;
