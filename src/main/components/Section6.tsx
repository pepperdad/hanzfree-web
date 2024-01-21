import React from 'react';

import Image from 'next/image';

import MustKnowBox from './MustKnowBox';

const Section6 = () => {
  return (
    <div className='my-10 md:my-20'>
      <div className='flex gap-4 items-center mb-6'>
        <Image src='/assets/alert-icon.svg' alt='alert-icon' width={54} height={54} />
        <span className='text-blue-700 text-4xl md:text-6xl font-medium'>Must-knows</span>
      </div>

      <div className='flex flex-col gap-6'>
        <MustKnowBox
          content='Please upload photos of your luggage via the link provided in the personal message after
          making your reservation.'
        />

        <MustKnowBox
          content='Cancellations or changes to your reservation are free of charge until 20:00 the service
            day before, but fees may apply thereafter.'
        />

        <MustKnowBox
          content='Please use a lock on your bag. We are not be responsible for any lost items inside the
          bag due to the absence of a lock.'
        />

        <MustKnowBox content=' Always carry your passport, travel documents, and valuables with you.' />
      </div>
    </div>
  );
};

export default Section6;
