import React from 'react';

import Image from 'next/image';

const Section2 = () => {
  return (
    <div id='section2' className='min-h-screen'>
      <div className="text-blue-700 text-7xl font-medium font-['Hind'] relative top-20 text-right">
        Introduction of Service
      </div>

      <div className="text-right text-zinc-800 text-[22px] font-normal font-['Roboto'] relative top-20 pb-40">
        Smooth luggage transportation throughout your entire journey. <br />
        From the airport to your accommodation, from your accommodation to the airport, and even
        between accommodations. <br />
        Same-day delivery service. Travel light and enjoy stress-free.
      </div>

      <div className='md:flex md:flex-wrap md:flex-row gap-6 pb-4 flex flex-col gap-3'>
        <div className='w-[250px] h-[250px] bg-blue-700 rounded-[50px] shadow-xl flex-col m-auto'>
          <div className='pl-4 flex-center pt-14 pb-10 gap-3'>
            <span>
              <Image src='/assets/airplane.svg' width={65} height={65} />
            </span>
            <span>
              <Image src='/assets/arrow.svg' width={17} height={14} />
            </span>
            <span>
              <Image src='/assets/home.svg' width={69} height={69} />
            </span>
            <div />
          </div>
          <div className="text-center text-white text-lg font-normal font-['Roboto'] leading-[25.20px]">
            Airport <br />
            to Acommodation
          </div>
        </div>

        <div className='w-[250px] h-[250px] bg-blue-700 rounded-[50px] shadow-xl flex-col m-auto'>
          <div className='pl-4 flex-center pt-14 pb-10 gap-3'>
            <span>
              <Image src='/assets/home.svg' width={65} height={65} />
            </span>
            <span>
              <Image src='/assets/arrow.svg' width={17} height={14} />
            </span>
            <span>
              <Image src='/assets/airplane.svg' width={69} height={69} />
            </span>
            <div />
          </div>
          <div className="text-center text-white text-lg font-normal font-['Roboto'] leading-[25.20px]">
            Accomodation <br />
            to Airport
          </div>
        </div>

        <div className='w-[250px] h-[250px] bg-blue-700 rounded-[50px] shadow-xl flex-col m-auto'>
          <div className='pl-4 flex-center pt-14 pb-10 gap-3'>
            <span>
              <Image src='/assets/home.svg' width={65} height={65} />
            </span>
            <span>
              <Image src='/assets/arrow.svg' width={17} height={14} />
            </span>
            <span>
              <Image src='/assets/home.svg' width={69} height={69} />
            </span>
            <div />
          </div>
          <div className="text-center text-white text-lg font-normal font-['Roboto'] leading-[25.20px]">
            Accomodation <br />
            to Acommodation
          </div>
        </div>

        <div className='w-[250px] h-[250px] bg-blue-700 rounded-[50px] shadow-xl flex-col m-auto'>
          <div className='pl-4 flex-center pt-14 pb-10 gap-3'>
            <span>
              <Image src='/assets/car.svg' width={98} height={74} />
            </span>
            <div />
          </div>
          <div className="text-center text-white text-lg font-normal font-['Roboto'] leading-[25.20px]">
            Airport <br />
            to Acommodation
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
