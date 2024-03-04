import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { login } from '@pages/api';
import LoginForm from '@shared/components/LoginForm';
import SignInGoogle from '@shared/components/SignInGoogle';

const Loading = dynamic(() => import('@shared/components/animation/loading'), { ssr: false });

const Airplane = dynamic(() => import('@shared/components/animation/airplane'), { ssr: false });

const Page = () => {
  const router = useRouter();

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
    <div className='py-8 min-h-screen-264 flex-center'>
      {loading && (
        <div className='absolute top-0 left-0 z-10 flex-center w-screen h-screen opacity-60 bg-slate-50'>
          <Loading />
        </div>
      )}

      <div className='md:w-4/5 flex w-full'>
        <div className='w-1/2 hidden md:block'>
          <Airplane />
        </div>

        <div className='w-full md:w-1/2 flex flex-col items-center'>
          <h1 className='text-3xl md:text-4xl font-bold text-center'>Log In</h1>
          <h2 className='mt-1 pb-8 text-sm md:text-lg text-center text-gray-500'>
            {from ? 'Sign in to use service' : 'Welcome! We are hanzfree. Enjoy your travel.'}
          </h2>

          <div className='flex justify-center w-full'>
            <div className='w-4/5 relative md:w-4/5'>
              <LoginForm onClick={onClick} />
              <div className='flex justify-center'>
                {error && <span className='absolute text-red-500 top-55'>{error}</span>}
              </div>

              <SignInGoogle from={from} />
              <div className='flex justify-center mt-4'>
                <p className='text-gray-400 text-sm md:text-base'>
                  Don&apos;t have an account yet?
                </p>
                <span
                  className='ml-3 text-blue-700 hover:text-blue-900 cursor-pointer underline underline-offset-2 text-sm md:text-base'
                  onClick={() => router.push('/signup')}
                >
                  Sign up
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
