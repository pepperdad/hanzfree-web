import React from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Complete = dynamic(() => import('@shared/components/animation/complete'), { ssr: false });

const CompletePage = () => {
  const router = useRouter();

  return (
    <div className='py-8 2xl:mb-20'>
      <div className='flex-center flex-col text-center'>
        <div className='text-4xl md:text-6xl font-medium pb-4'>Sign up Complete!</div>
        <h2 className='pb-8 text-lg text-center text-gray-500'>get Started with your account</h2>
        <div className='w-80 h-80'>
          <Complete />
        </div>
        <button
          onClick={() => router.push('/login')}
          className='text-2xl font-bold border-2 px-24 py-2 rounded-[40px] hover:bg-blue-700 hover:text-white'
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default CompletePage;
