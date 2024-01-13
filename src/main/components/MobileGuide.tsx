import React from 'react';

import Image from 'next/image';

const MobileGuide = () => {
  return (
    <div className='flex flex-col md:hidden'>
      <div className='flex items-center'>
        <div className='shrink-0'>
          <Image src='/assets/check.svg' alt='check' width={80} height={80} />
        </div>
        <div className="text-black text-md font-normal font-['Roboto'] rounded-3xl bg-gray-200 p-2 grow">
          Before the trip, entrust your luggage and enjoy a comfortable journey.
        </div>
      </div>

      <div className='flex items-center'>
        <div className='shrink-0'>
          <Image src='/assets/location.svg' alt='location' width={80} height={80} />
        </div>
        <div className=" text-black text-md font-normal font-['Roboto'] rounded-3xl bg-gray-200 p-2 grow">
          Delivery available to various accommodations near Seoul.
        </div>
      </div>

      <div className='flex items-center'>
        <div className='shrink-0'>
          <Image src='/assets/price_down.svg' alt='price_down' width={80} height={80} />
        </div>
        <div className="text-black text-md font-normal font-['Roboto'] rounded-3xl bg-gray-200 p-2 grow">
          Affordable prices offered through bundled delivery.
        </div>
      </div>

      <div className='flex items-center'>
        <div className='shrink-0'>
          <Image src='/assets/luggage.svg' alt='luggage' width={80} height={80} />
        </div>
        <div className="text-black text-md font-normal font-['Roboto'] rounded-3xl bg-gray-200 p-2 grow">
          We deliver various items with detailed luggage sizes to your desired location.
        </div>
      </div>
    </div>
  );
};

export default MobileGuide;
