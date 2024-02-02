import React from 'react';

import Image from 'next/image';

import { mustKnows } from '@main/const';

import DescripctionTitle from './DescripctionTitle';
import MustKnowBox from './MustKnowBox';

const Section6 = () => {
  return (
    <div className='my-10 md:my-20'>
      <div className='flex gap-4 items-center mb-6'>
        <Image src='/assets/alert-icon.svg' alt='alert-icon' width={40} height={40} />
        <DescripctionTitle content='Must-knows' />
      </div>

      <div className='flex flex-col gap-6'>
        {mustKnows.map((mustknow, i) => (
          <MustKnowBox key={`must-know-${i}`} content={mustknow.content} />
        ))}
      </div>
    </div>
  );
};

export default Section6;
