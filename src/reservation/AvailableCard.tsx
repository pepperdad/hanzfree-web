import React from 'react';

import Image from 'next/image';

const AvailableCard = () => {
  return (
    <div className='flex gap-2'>
      <div className='relative w-10 h-8 border box-content'>
        <Image src='/assets/reservation/visa_symbol.svg' alt='visa' layout='fill' />
      </div>
      <div className='relative w-10 h-8 border box-content'>
        <Image src='/assets/reservation/mc_symbol.svg' alt='master card' layout='fill' />
      </div>
    </div>
  );
};

export default AvailableCard;
