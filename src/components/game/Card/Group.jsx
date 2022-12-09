import React from 'react';
import { GROUP } from '../../../models/Group.js';
const Group = ({ group }) => {
  const _group = (group) => {
    if (group === GROUP.NONE) return '';
    if (group === GROUP.ENGINEER) return 'eng';
    if (group === GROUP.ORACLE) return 'ora';
    if (group === GROUP.SABOTEUR) return 'sab';
    if (group === GROUP.WORKER) return 'wor';
    if (group === GROUP.MAGE) return 'mag';
    if (group === GROUP.BOMBER) return 'bom';
  };
  return <div className='text-black w-full'>{_group(group)}</div>;
};

export default Group;
