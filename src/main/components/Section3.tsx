import React from 'react';

import MobileGuide from './MobileGuide';
import PCGuide from './PCGuide';

const Section3 = () => {
  return (
    <div className='py-10 md:pt-0'>
      <PCGuide />
      <MobileGuide />
    </div>
  );
};

export default Section3;
