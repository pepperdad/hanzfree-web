import React, { useState } from 'react';

import Image from 'next/image';

import Alert from './Alert';

interface SignInGoogleProps {
  from: string | string[] | undefined;
}

const SignInGoogle = ({ from }: SignInGoogleProps) => {
  const [onAlert, setOnAlert] = useState({
    open: false,
    message: '',
  });

  const googleLoginHandler = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/redirect?from=${from}`;
  };

  return (
    <div className='flex flex-col items-center justify-center mt-10 border-y py-6'>
      {onAlert && <Alert onAlert={onAlert} setOnAlert={setOnAlert} />}
      <div className='text-center mb-3'>Or sign in with:</div>
      <div
        onClick={() => googleLoginHandler()}
        className='flex items-center border-2 hover:border-blue-700 cursor-pointer hover:bg-blue-700 hover:text-white text-slate-400 hover:opacity-80'
      >
        <button className='p-2 flex-center bg-white'>
          <Image src='/assets/shared/google_icon.svg' alt='google login' width={36} height={36} />
        </button>
        <div className='w-[180px] h-full p-3 font-bold text-sm md:text-base'>
          Sign in with Google
        </div>
      </div>

      <div
        onClick={() => {
          setOnAlert({
            open: true,
            message: 'This feature is not available yet.',
          });
        }}
        className='flex items-center bg-black border-2 border-black cursor-pointer text-white hover:text-gray-400 mt-2 hover:opacity-80'
      >
        <button className='flex-center bg-white'>
          <Image src='/assets/shared/apple_icon.png' alt='google login' width={52} height={52} />
        </button>
        <div className='w-[180px] h-full p-3 font-bold text-sm md:text-base bg-black'>
          Sign in with Apple
        </div>
      </div>
    </div>
  );
};

export default SignInGoogle;
