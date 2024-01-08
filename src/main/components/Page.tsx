import React from 'react';

import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';

const Page = () => {
  return (
    <div className='flex justify-center'>
      <div className='w-4/5 flex-col'>
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
      {/* <div className='w-screen h-screen'>hi</div> */}
    </div>
  );
};

export default Page;
