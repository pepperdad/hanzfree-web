import React from 'react';

import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';

const Page = () => {
  const mobile = true;
  return (
    <div className='flex justify-center relative overflow-hidden'>
      <div className='w-4/5 flex-col'>
        <Section1 />
        <div className='w-[300px] h-[300px] bg-gradient-to-b from-indigo-200 to-zinc-100 rounded-full absolute -right-20 -z-20' />
        <div className='w-[600px] h-[600px] -left-60 top-[1600px] md:w-[700px] md:h-[700px] md:origin-top-left md:rotate-[-15deg] md:-left-60 md:top-[1000px] bg-gradient-to-b from-indigo-200 to-zinc-100 rounded-full absolute -z-20' />
        <Section2 />
        <Section3 />
      </div>
      {/* <div className='w-screen h-screen'>hi</div> */}
    </div>
  );
};

export default Page;
