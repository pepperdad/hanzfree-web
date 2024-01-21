import React from 'react';

import Image from 'next/image';

const PCGuide = () => {
  return (
    <div className='flex-col hidden md:flex'>
      <div className='flex items-center'>
        <div className='pr-5'>
          <Image src='/assets/line.svg' alt='line' width={127} height={20} />
        </div>
        <div className='text-black text-xl font-normal rounded-3xl bg-gray-200 p-3'>
          Before the trip, entrust your luggage and enjoy a comfortable journey.
        </div>
        <div>
          <Image src='/assets/check.svg' alt='check' width={200} height={200} />
        </div>
      </div>

      <div className='flex items-center justify-end'>
        <span>
          <Image src='/assets/location.svg' alt='check' width={200} height={200} />
        </span>
        <div className=' text-black text-xl font-normal rounded-3xl bg-gray-200 p-3'>
          Delivery available to various accommodations near Seoul.
        </div>
        <div className='pr-5 rotate-180 right-16'>
          <Image src='/assets/line.svg' alt='line' width={127} height={20} />
        </div>
      </div>

      <div className='flex items-center'>
        <div className='pr-5'>
          <Image src='/assets/line.svg' alt='line' width={127} height={20} />
        </div>
        <div className='text-black text-xl font-normal rounded-3xl bg-gray-200 p-3'>
          Affordable prices offered through bundled delivery.
        </div>
        <div>
          <Image src='/assets/price_down.svg' alt='check' width={200} height={200} />
        </div>
      </div>

      <div className='flex items-center justify-end'>
        <span>
          <Image src='/assets/luggage.svg' alt='check' width={200} height={200} />
        </span>
        <div className='text-black text-xl font-normal rounded-3xl bg-gray-200 p-3'>
          We deliver various items with detailed luggage sizes to your desired location.
        </div>
        <div className='pr-5 rotate-180 right-16'>
          <Image src='/assets/line.svg' alt='line' width={127} height={20} />
        </div>
      </div>
    </div>
  );
};

export default PCGuide;
