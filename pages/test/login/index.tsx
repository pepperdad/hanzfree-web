import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { login } from '@pages/api';

import LoginForm from '@shared/components/LoginForm';

const Page = () => {
  const router = useRouter();
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
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/redirect?redirect=${from}`;
  };

  const onClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await login(email, password);
      console.log('from', from);
      console.log('res', res);

      if (res.status === 201) {
        if (from) router.push(`/${from}`);
        else router.push('/test');
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
    <div className='pt-32'>
      <div className='flex justify-center'>
        <div>
          <img src='/hanzfree.png' alt='hanzfree' />
        </div>
        <div className='w-1/3 relative'>
          <LoginForm onClick={onClick} />
          <div className='flex justify-center'>
            {error && <span className='text-red-500 absolute -bottom-10'>{error}</span>}
          </div>
        </div>
      </div>
      <button className='p-4 bg-red-100' onClick={() => googleLoginHandler()}>
        google login
      </button>
    </div>
  );
};

export default Page;
