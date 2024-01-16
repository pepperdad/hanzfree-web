import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useSetRecoilState } from 'recoil';

import { login } from '@pages/api';

import LoginForm from '@shared/components/LoginForm';
import { userState } from '@shared/recoil';

const Page = () => {
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  // TODO: 리다이렉트 from 페이지로
  const { from } = router.query;
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  }, [error]);

  const googleLoginHandler = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/login?from=${from}`;
  };

  const onClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await login(email, password);

      if (res.status === 201) {
        setUser({
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          currentRefreshTokenExp: res.data.currentRefreshTokenExp,
          role: res.data.role,
          createdAt: res.data.createdAt,
        });

        if (from) router.push(`/${from}`);
        else router.push('/');
      } else if (res.status === 400) {
        setError('비밀번호가 일치하지 않습니다.');
      } else if (res.status === 404) {
        setError('존재하지 않는 아이디입니다.');
      }
    } catch (err: any) {
      console.log('err', err);
      setError('서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className='pt-6'>
      <h1 className='text-4xl font-bold text-center'>Log In</h1>
      <h2 className='pb-8 text-lg text-center text-gray-500'>Sign in to use service</h2>
      <div className='flex justify-center'>
        <div className='relative w-3/5 md:w-1/3'>
          <LoginForm onClick={onClick} />
          <div className='flex justify-center'>
            {error && <span className='absolute text-red-500 top-54'>{error}</span>}
          </div>

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

          <div className='flex justify-center mt-4'>
            <div className='text-gray-400'>Don&apos;t have an account yet?</div>
            <div
              className='ml-2 text-blue-700 cursor-pointer'
              onClick={() => router.push('/signup')}
            >
              Sign up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
