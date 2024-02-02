import React from 'react';

import Image from 'next/image';

const PCIntro = () => {
  return (
    <>
      <div className='w-[250px] h-[250px] bg-blue-700 rounded-[50px] shadow-xl flex-col m-auto'>
        <div className='pb-10 flex-center pt-14'>
          <div>
            <Image src='/assets/airplane.svg' alt='airplane' width={65} height={65} />
          </div>
          <div className='px-2'>
            <Image src='/assets/arrow.svg' alt='arrow' width={17} height={14} />
          </div>
          <div>
            <Image src='/assets/home.svg' alt='home' width={65} height={65} />
          </div>
          <div />
        </div>
        <div className='text-center text-white text-xl'>
          Airport <br />
          to Acommodation
        </div>
      </div>

      <div className='w-[250px] h-[250px] bg-blue-700 rounded-[50px] shadow-xl flex-col m-auto'>
        <div className='pb-10 flex-center pt-14'>
          <div>
            <Image src='/assets/home.svg' alt='home' width={65} height={65} />
          </div>
          <div className='px-2'>
            <Image src='/assets/arrow.svg' alt='arrow' width={17} height={14} />
          </div>
          <div>
            <Image src='/assets/airplane.svg' alt='airplane' width={69} height={69} />
          </div>
          <div />
        </div>
        <div className='text-center text-white text-xl'>
          Accomodation <br />
          to Airport
        </div>
      </div>

      <div className='w-[250px] h-[250px] bg-blue-700 rounded-[50px] shadow-xl flex-col m-auto'>
        <div className='pb-10 flex-center pt-14'>
          <div>
            <Image src='/assets/home.svg' alt='home' width={65} height={65} />
          </div>
          <div className='px-2'>
            <Image src='/assets/arrow.svg' alt='arrow' width={17} height={14} />
          </div>
          <div>
            <Image src='/assets/home.svg' alt='home' width={65} height={65} />
          </div>
          <div />
        </div>
        <div className='text-center text-white text-xl'>
          Accomodation <br />
          to Acommodation
        </div>
      </div>

      <div className='w-[250px] h-[250px] bg-blue-700 rounded-[50px] shadow-xl flex-col m-auto'>
        <div className='pb-8 flex-center pt-14'>
          <span>
            <Image src='/assets/car.svg' alt='car' width={98} height={74} />
          </span>
          <div />
        </div>
        <div className='text-center text-white text-xl'>
          Airport <br />
          to Acommodation
        </div>
      </div>
    </>
  );
};

export default PCIntro;
