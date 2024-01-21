import React from 'react';

import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import Section6 from './Section6';

const Page = () => {
  return (
    <div className='relative flex justify-center overflow-hidden'>
      <div className='flex-col w-4/5'>
        <Section1 />
        <div className='w-[450px] h-[450px] bg-gradient-to-b from-indigo-200 to-zinc-100 rounded-full absolute -right-80 -z-20 rotate-[90.14deg] md:-right-40' />
        <div className='hidden w-[600px] h-[600px] -left-60 top-[1600px] md:w-[700px] md:h-[700px] md:origin-top-left md:rotate-[-15deg] md:-left-60 md:top-[1000px] bg-gradient-to-b from-indigo-200 to-zinc-100 rounded-full absolute -z-20' />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
      </div>
      {/* <div className='w-screen h-screen'>hi</div> */}
    </div>
  );
};

export default Page;
