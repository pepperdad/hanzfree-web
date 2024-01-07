import React from 'react';

import { useRouter } from 'next/router';

import Button from '@shared/components/Button';
import Input from '@shared/components/Input';

interface LoginFormProps {
  onClick: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm = ({ onClick }: LoginFormProps) => {
  const router = useRouter();
  const { from } = router.query;

  return (
    <form className='flex flex-col gap-2 items-center w-full h-full' onSubmit={onClick}>
      <Input fullWidth placeholder='ID' name='email' />
      <Input fullWidth placeholder='PW' type='password' name='password' />
      <Button fullWidth type='submit'>
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
