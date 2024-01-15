import React from 'react';

import Button from '@shared/components/Button';
import Input from '@shared/components/Input';

interface LoginFormProps {
  onClick: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm = ({ onClick }: LoginFormProps) => {
  return (
    <form className='flex flex-col items-center w-full gap-2' onSubmit={onClick}>
      <Input
        fullWidth
        placeholder='Enter your email'
        name='email'
        label='Email Address'
        inputStyle='bg-slate-100'
      />
      <Input
        fullWidth
        placeholder='Enter your password'
        type='password'
        name='password'
        label='Password'
        inputStyle='bg-slate-100'
      />
      <Button fullWidth type='submit' buttonStyle='mt-4'>
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
