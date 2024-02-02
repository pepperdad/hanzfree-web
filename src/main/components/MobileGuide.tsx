import React from 'react';

import Image from 'next/image';

const MobileGuide = () => {
  return (
    <div className='flex flex-col gap-4 md:hidden'>
      <div className='flex items-center'>
        <div className='shrink-0'>
          <Image src='/assets/landing/check.svg' alt='check' width={80} height={80} />
        </div>
        <div className='text-black font-normal rounded-2xl bg-gray-200 py-2 px-3 grow'>
          Before the trip, entrust your luggage and enjoy a comfortable journey.
        </div>
      </div>

      <div className='flex items-center'>
        <div className='shrink-0'>
          <Image src='/assets/landing/location.svg' alt='location' width={80} height={80} />
        </div>
        <div className='text-black font-normal rounded-2xl bg-gray-200 py-2 px-3 grow'>
          Delivery available to various accommodations near Seoul.
        </div>
      </div>

      <div className='flex items-center'>
        <div className='shrink-0'>
          <Image src='/assets/landing/price_down.svg' alt='price_down' width={80} height={80} />
        </div>
        <div className='text-black font-normal rounded-2xl bg-gray-200 py-2 px-3 grow'>
          Affordable prices offered through bundled delivery.
        </div>
      </div>

      <div className='flex items-center'>
        <div className='shrink-0'>
          <Image src='/assets/landing/luggage.svg' alt='luggage' width={80} height={80} />
        </div>
        <div className='text-black font-normal rounded-2xl bg-gray-200 py-2 px-3 grow'>
          We deliver various items with detailed luggage sizes to your desired location.
        </div>
      </div>
    </div>
  );
};

export default MobileGuide;
