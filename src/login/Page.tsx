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
    <div className='pt-24'>
      <h1 className='pb-10 text-4xl font-bold text-center'>Log In</h1>
      <div className='flex justify-center'>
        <div className='relative w-3/5 md:w-1/3'>
          <LoginForm onClick={onClick} />
          <div className='flex justify-center'>
            {error && <span className='absolute text-red-500 -bottom-1'>{error}</span>}
          </div>
          <div className='flex justify-center'>
            <div
              onClick={() => googleLoginHandler()}
              className='flex items-center border-2 hover:border-blue-700'
            >
              <button className='p-1 flex-center'>
                <Image src='/assets/google_icon.svg' alt='google login' width={36} height={36} />
              </button>
              <div className='h-full p-2 font-bold text-gray-400 flex-center hover:bg-blue-700 hover:text-white'>
                Sign in with Google
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
