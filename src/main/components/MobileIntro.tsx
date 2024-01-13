import React from 'react';

import Image from 'next/image';

const MobileIntro = () => {
  return (
    <>
      <div className='flex gap-3 pb-8'>
        <div className='w-[250px] h-[200px] bg-blue-700 rounded-[20px] shadow-xl flex-col m-auto'>
          <div className='pt-10 pb-8 flex-center'>
            <div>
              <Image src='/assets/airplane.svg' width={45} height={45} />
            </div>
            <div className='px-2'>
              <Image src='/assets/arrow.svg' width={17} height={14} />
            </div>
            <div>
              <Image src='/assets/home.svg' width={45} height={45} />
            </div>
            <div />
          </div>
          <div className="text-center text-white text-lg font-normal font-['Roboto'] leading-[25.20px]">
            Airport <br />
            to Acommodation
          </div>
        </div>

        <div className='w-[250px] h-[200px] bg-blue-700 rounded-[20px] shadow-xl flex-col m-auto'>
          <div className='pt-10 pb-8 flex-center'>
            <div>
              <Image src='/assets/home.svg' width={45} height={45} />
            </div>
            <div className='px-2'>
              <Image src='/assets/arrow.svg' width={17} height={14} />
            </div>
            <div>
              <Image src='/assets/airplane.svg' width={45} height={45} />
            </div>
            <div />
          </div>
          <div className="text-center text-white text-lg font-normal font-['Roboto'] leading-[25.20px]">
            Accomodation <br />
            to Airport
          </div>
        </div>
      </div>

      <div className='flex gap-3'>
        <div className='w-[250px] h-[200px] bg-blue-700 rounded-[20px] shadow-xl flex-col m-auto'>
          <div className='pt-10 pb-8 flex-center'>
            <div>
              <Image src='/assets/home.svg' width={45} height={45} />
            </div>
            <div className='px-2'>
              <Image src='/assets/arrow.svg' width={17} height={14} />
            </div>
            <div>
              <Image src='/assets/home.svg' width={45} height={45} />
            </div>
            <div />
          </div>
          <div className="text-center text-white text-lg font-normal font-['Roboto'] leading-[25.20px]">
            Accomodation <br />
            to Acommodation
          </div>
        </div>
        <div className='w-[250px] h-[200px] bg-blue-700 rounded-[20px] shadow-xl flex-col m-auto'>
          <div className='pt-10 pb-8 flex-center'>
            <span>
              <Image src='/assets/car.svg' width={98} height={45} />
            </span>
            <div />
          </div>
          <div className="text-center text-white text-lg font-normal font-['Roboto'] leading-[25.20px]">
            Airport <br />
            to Acommodation
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileIntro;
