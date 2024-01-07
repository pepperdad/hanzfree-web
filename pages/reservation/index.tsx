import React from 'react';

import { useRouter } from 'next/router';

import Instance from '@pages/api/config';
import Button from '@shared/components/Button';
import Input from '@shared/components/Input';

const index = () => {
  const router = useRouter();

  const handleReservation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;

    try {
      const res = await Instance.post('/user/reservation', {
        firstName,
        lastName,
      });

      if (res.status === 201) {
        router.push('/reservation/complete');
      }
    } catch (err: any) {
      console.log('err', err);
    }
  };

  return (
    <div className='pt-20 flex flex-col items-center'>
      <p className='pb-10'>예약 페이지</p>
      <form className='flex flex-col gap-2 items-center w-1/2 h-full' onSubmit={handleReservation}>
        <Input fullWidth label='firstName' placeholder='firstName' name='firstName' />
        <Input fullWidth label='lastName' placeholder='lastName' name='lastName' />
        <Button fullWidth type='submit'>
          complete
        </Button>
      </form>
    </div>
  );
};

export default index;
