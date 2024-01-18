import React from 'react';

import Image from 'next/image';

const Section6 = () => {
  return (
    <div className='mt-20'>
      <div className='flex gap-4'>
        <Image src='/assets/alert-icon.svg' alt='alert-icon' width={54} height={54} />
        <div className='text-blue-700 text-7xl font-medium'>Must-knows</div>
      </div>

      <div className='flex flex-col gap-6'>
        <div className='bg-white rounded-[50px] shadow border-2 border-blue-700 flex-center mt-10 p-3'>
          <span className='text-zinc-800 text-lg font-normal'>
            Please upload photos of your luggage via the link provided in the personal message after
            making your reservation.
          </span>
        </div>

        <div className='bg-white rounded-[50px] shadow border-2 border-blue-700 flex-center p-3'>
          <span className='text-zinc-800 text-lg font-normal'>
            Cancellations or changes to your reservation are free of charge until 20:00 the service
            day before, but fees may apply thereafter.
          </span>
        </div>

        <div className='bg-white rounded-[50px] shadow border-2 border-blue-700 flex-center p-3'>
          <span className='text-zinc-800 text-lg font-normal'>
            Please use a lock on your bag. We are not be responsible for any lost items inside the
            bag due to the absence of a lock.
          </span>
        </div>

        <div className='bg-white rounded-[50px] shadow border-2 border-blue-700 flex-center p-3'>
          <span className='text-zinc-800 text-lg font-normal'>
            Always carry your passport, travel documents, and valuables with you.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Section6;
