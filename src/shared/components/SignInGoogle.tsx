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

  const hrefToSocial = (type: string) => {
    if (type === 'google') {
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/redirect?from=${from}`;
    } else if (type === 'facebook') {
      setOnAlert({
        open: true,
        message: 'This feature is not available yet.',
      });
      // window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/facebook/redirect?from=${from}`;
    } else if (type === 'apple') {
      setOnAlert({
        open: true,
        message: 'This feature is not available yet.',
      });
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-10 border-y py-6'>
      {onAlert && <Alert onAlert={onAlert} setOnAlert={setOnAlert} />}
      <div className='text-center mb-3'>Or sign in with:</div>

      <div className='flex w-full justify-center gap-6'>
        <button
          onClick={() => hrefToSocial('google')}
          className='flex items-center justify-center h-12 w-12 rounded-full bg-white hover:bg-gray-100 shadow-md p-0.5'
        >
          <img src='/assets/shared/google_icon.svg' alt='Google 로그인' />
        </button>

        <button
          onClick={() => hrefToSocial('facebook')}
          className='flex items-center justify-center h-12 w-12 rounded-full bg-white hover:bg-gray-200 shadow-md p-0.5'
        >
          <img src='/assets/shared/facebook_icon.png' alt='Facebook 로그인' />
        </button>

        <button
          onClick={() => hrefToSocial('apple')}
          className='flex items-center justify-center h-12 w-12 rounded-full bg-white hover:bg-gray-100 shadow-md p-1'
        >
          <img src='/assets/shared/apple_icon2.png' alt='Apple 로그인' />
        </button>
      </div>
    </div>
  );
};

export default SignInGoogle;
