import React from 'react';

import Image from 'next/image';

const PageIntro = () => {
  return (
    <>
      <h1 className='mx-4 text-2xl md:text-4xl font-semibold text-center text-blue-700'>
        Incheon International Airport (ICN) Luggage Service by HANZFREE
      </h1>
      <div className='mx-6 mt-10 flex gap-5 md:gap-10'>
        <Image src='/assets/reservation/airplane.svg' alt='airplane' width={180} height={180} />
        <Image src='/assets/reservation/left_arrow.svg' alt='left_arrow' width={45} height={45} />
        <Image src='/assets/reservation/luggage.svg' alt='luggage' width={150} height={150} />
        <Image src='/assets/reservation/right_arrow.svg' alt='right_arrow' width={45} height={45} />
        <Image src='/assets/reservation/home.svg' alt='home' width={180} height={180} />
      </div>
    </>
  );
};

export default PageIntro;
