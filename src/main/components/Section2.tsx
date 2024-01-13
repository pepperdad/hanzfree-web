import React from 'react';

import MobileIntro from './MobileIntro';
import PCIntro from './PCIntro';

const Section2 = () => {
  return (
    <div id='section2' className='min-h-screen'>
      <div className="text-blue-700 text-6xl font-medium font-['Hind'] relative top-20 text-right pb-2">
        Introduction of Service
      </div>

      <div className="text-right text-zinc-800 text-xl font-['Roboto'] relative top-20 pb-32">
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
