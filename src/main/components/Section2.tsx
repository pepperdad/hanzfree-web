import React from 'react';

import MobileIntro from './MobileIntro';
import PCIntro from './PCIntro';

const Section2 = () => {
  return (
    <div id='section2' className='md:py-10'>
      <div className='text-blue-700 text-4xl md:text-7xl font-medium text-right pb-2'>
        Introduction of Service
      </div>

      <div className='text-right text-zinc-800 text-md md:text-xl pt-4 pb-16'>
        Smooth luggage transportation throughout your entire journey. <br />
        From the airport to your accommodation, from your accommodation to the airport, and even
        between accommodations. <br />
        Same-day delivery service. Travel light and enjoy stress-free.
      </div>

      <div className='hidden gap-3 md:flex md:flex-row'>
        <PCIntro />
      </div>

      <div className='flex-col md:hidden'>
        <MobileIntro />
      </div>
    </div>
  );
};

export default Section2;
