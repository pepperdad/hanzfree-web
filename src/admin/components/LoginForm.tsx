import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { login } from '@pages/api';
import Button from '@shared/components/Button';
import Input from '@shared/components/Input';

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 2000);

      return () => {
        clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
      };
    }
  }, [error]);

  const onClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await login(email, password);

      if (res.status === 201) {
        router.push('/admin/dashboard');
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
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className='flex flex-col items-center justify-center gap-3'>
        <div>
          <img src='/hanzfree.png' alt='hanzfree' />
        </div>
        <h1 className='text-3xl font-bold'>관리자 로그인</h1>

        <form
          className='flex flex-col gap-2 justify-around items-center w-full h-1/2 pb-12 relative'
          onSubmit={onClick}
        >
          <Input fullWidth placeholder='ID' name='email' />
          <Input fullWidth placeholder='PW' type='password' name='password' />
          <Button fullWidth type='submit'>
            로그인
          </Button>
          {error && <div className='text-red-500 absolute bottom-2'>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
