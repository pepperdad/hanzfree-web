import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { getLogginedUser } from '@pages/api';

export interface Admin {
  email: string;
  firstName: string;
  lastName: string;
}

const Index = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin>();

  useEffect(() => {
    getLogginedUser()
      .then((res) => {
        setAdmin(res.data);
      })
      .catch(() => {
        router.push('/admin');
      });
  }, []);

  return (
    <div className='container mx-auto p-4 text-center'>
      <h1 className='text-3xl font-bold mb-4'>어서오세요, {admin?.firstName} 님!</h1>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Link href='/admin/dashboard/user'>
          <a className='block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
            유저 목록 보기
          </a>
        </Link>

        <Link href='/admin/dashboard/reservation'>
          <a className='block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'>
            예약 목록 보기
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Index;
