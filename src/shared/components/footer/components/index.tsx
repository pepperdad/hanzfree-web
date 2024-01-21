import React from 'react';

import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='w-full h-[150px] px-3 py-2 bg-blue-700 text-slate-100 flex md:block'>
      <p className='text-center'>Contact Info.</p>
      <div>
        <div className='md:w-full flex flex-col gap-y-2 md:flex-row justify-center md:gap-12 md:my-3'>
          <div className='md:min-w-56 flex flex-row ml-8 md:ml-0 md:flex-col items-center'>
            <Image src='/assets/whatsapp.svg' alt='whatsapp' width={40} height={40} />
            <span className='ml-3 md:ml-0'>hanzfree</span>
          </div>

          <div className='md:min-w-56 flex flex-row ml-8 md:ml-0 md:flex-col items-center'>
            <Image src='/assets/line_talk.svg' alt='line' width={40} height={40} />
            <span className='ml-3 md:ml-0'>hanzfree@naver.com</span>
          </div>

          <div className='md:min-w-56 flex flex-row ml-8 md:ml-0 md:flex-col items-center'>
            <Image src='/assets/gmail.svg' alt='whatsapp' width={40} height={40} />
            <span className='ml-3 md:ml-0'>hanzfree@gmail.com</span>
          </div>
        </div>
        <p className='text-center text-sm hidden md:block'>
          Copyright 2024 HANZFREE All Rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
