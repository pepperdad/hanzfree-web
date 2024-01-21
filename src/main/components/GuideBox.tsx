import React from 'react';

import Image from 'next/image';

interface GuideBoxProps {
  number: number;
  content: string;
  img: string;
}

const GuideBox = ({ number, content, img }: GuideBoxProps) => {
  return (
    <div className='flex flex-col my-2'>
      <div className='flex-center w-10 h-10 bg-neutral-500 rounded-full text-white'>
        <span>{number}</span>
      </div>
      <div className='w-64 h-[420px] p-6 bg-white rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[110px] shadow flex flex-col items-center'>
        <div className='text-black text-base font-normal min-h-20'>{content}</div>
        <div className='w-[200px] h-[260px] bg-gray-200 rounded-t-3xl rounded-bl-3xl rounded-br-[80px] relative'>
          <Image src={img} alt='guide' layout='fill' />
        </div>
      </div>
    </div>
  );
};

export default GuideBox;
