import React from 'react';

import Image from 'next/image';

import { useRecoilValue } from 'recoil';

import { reservationState } from '@shared/recoil';

import { DELIVERY_TYPE } from './constants';

const BasicInfo = () => {
  const { method } = useRecoilValue(reservationState);

  return (
    <>
      <div className='flex items-center w-full md:w-4/5'>
        <div className='w-2.5 h-10 bg-blue-700 mr-3' />
        <div className='text-black text-3xl font-medium'>Enter info</div>
      </div>
      <div className='w-full md:w-4/5 my-2 text-neutral-600 text-lg font-normal'>
        Please fill out the information below.
      </div>
      <div className='flex justify-center md:w-4/5 my-3 p-3 md:p-4 rounded-[24px] border border-zinc-500'>
        <div className='flex w-16 md:w-fit shrink-0'>
          <Image src='/assets/reservation/delivery.svg' alt='delivery' width={145} height={110} />
        </div>
        <div className='flex flex-col ml-4 justify-between'>
          <div className='md:text-2xl font-medium text-blue-700'>
            Incheon International Airport (ICN) Luggage Service by HANZFREE
          </div>
          <div className='text-neutral-600 text-lg md:text-xl font-normal'>
            {DELIVERY_TYPE[method]}
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
