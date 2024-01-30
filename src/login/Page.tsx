import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { login } from '@pages/api';
import LoginForm from '@shared/components/LoginForm';
import SignInGoogle from '@shared/components/SignInGoogle';

const Loading = dynamic(() => import('@shared/components/animation/loading'), { ssr: false });

const Page = () => {
  const router = useRouter();

  // TODO: 소셜로그인 리다이렉트
  const { from } = router.query;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 1000);
    }
  }, [error]);

  const onClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length === 0) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const res = await login(email, password);

      // console.log('res', res);

      if (res.status === 201) {
        if (from) router.push(`/${from}`);
        else router.push('/');
      } else if (res.status === 400) {
        setError('Passwords do not match.');
      } else if (res.status === 404) {
        setError('The Email does not exist.');
      }
      setLoading(false);
    } catch (err: any) {
      console.log('err', err);
      setError('서버 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  return (
    <div className='py-8 min-h-screen-230'>
      {loading && (
        <div className='absolute top-0 left-0 z-10 flex-center w-screen h-screen opacity-80'>
          <Loading />
        </div>
      )}
      <h1 className='text-4xl font-bold text-center'>Log In</h1>
      <h2 className='pb-8 text-lg text-center text-gray-500'>Sign in to use service</h2>
      <div className='flex justify-center'>
        <div className='relative w-3/5 md:w-1/3'>
          <LoginForm onClick={onClick} />
          <div className='flex justify-center'>
            {error && <span className='absolute text-red-500 top-55'>{error}</span>}
          </div>

          <SignInGoogle from={from} />
          <div className='flex justify-center mt-4'>
            <p className='text-gray-400'>Don&apos;t have an account yet?</p>
            <span
              className='ml-2 text-blue-700 cursor-pointer hover:underline hover:underline-offset-2'
              onClick={() => router.push('/signup')}
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
