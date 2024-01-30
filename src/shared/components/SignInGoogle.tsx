import React from 'react';

import Image from 'next/image';

interface SignInGoogleProps {
  from: string | string[] | undefined;
}

const SignInGoogle = ({ from }: SignInGoogleProps) => {
  const googleLoginHandler = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/login?from=${from}`;
  };

  return (
    <div className='flex flex-col items-center justify-center mt-10 border-y py-6'>
      <div className='text-center mb-3'>Or sign in with:</div>
      <div
        onClick={() => googleLoginHandler()}
        className='flex items-center border-2 hover:border-blue-700 cursor-pointer hover:bg-blue-700 hover:text-white text-gray-400'
      >
        <button className='p-2 flex-center bg-white'>
          <Image src='/assets/google_icon.svg' alt='google login' width={36} height={36} />
        </button>
        <div className='h-full p-3 font-bold flex-center'>Sign in with Google</div>
      </div>
    </div>
  );
};

export default SignInGoogle;
