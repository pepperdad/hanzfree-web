import React from 'react';

import DescripctionTitle from './DescripctionTitle';
import MobileIntro from './MobileIntro';
import PCIntro from './PCIntro';

const Section2 = () => {
  return (
    <div id='section2' className='py-10'>
      <DescripctionTitle content='Introduction of Service' className='text-right' />

      <div className='text-right text-gray-700 pt-4 pb-16'>
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
