import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { login } from '@pages/api';
import LoginForm from '@shared/components/LoginForm';
import { Role } from '@shared/constants/role';

const AdminPage = () => {
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

  const onClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await login(email, password);
      console.log('res', res);

      if (res.status === 201) {
        if (res.data.role === Role.ADMIN) router.push('/admin/dashboard');
        else {
          alert('관리자만 접근 가능합니다.');
          router.push('/');
        }
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
    <div className='flex-center w-screen h-screen'>
      <div className='flex-center flex-col gap-3 relative'>
        <div>
          <img src='/hanzfree.png' alt='hanzfree' />
        </div>
        <h1 className='text-3xl font-bold'>관리자 로그인</h1>
        <LoginForm onClick={onClick} />
        <div className='flex justify-center'>
          {error && <span className='text-red-500 absolute -bottom-10'>{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
