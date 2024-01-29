import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { getLogginedUser } from '@pages/api';
import Instance from '@pages/api/config';

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

const user = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<User>();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getLogginedUser()
      .then((res) => {
        setAdmin(res.data);
      })
      .catch((e) => {
        router.push('/admin');
      });

    Instance.get('/user')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div>
      <header className='bg-gray-800 text-white p-4'>
        <div className='container mx-auto'>
          <h1 className='text-2xl font-bold'>유저 관리</h1>
          <Link href='/admin/dashboard'>
            <a className='text-blue-300 hover:text-blue-500 ml-4'>뒤로가기</a>
          </Link>
        </div>
      </header>

      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>전체 유저 목록</h1>
        {/* 테이블 부분 유지 */}

        <table className='min-w-full border border-gray-300'>
          <thead>
            <tr>
              <th className='border border-gray-300 px-4 py-2'>ID</th>
              <th className='border border-gray-300 px-4 py-2'>이름</th>
              <th className='border border-gray-300 px-4 py-2'>이메일</th>
              {/* 추가 필드에 따라 필요한 만큼 th를 추가하세요 */}
            </tr>
          </thead>
          <tbody>
            {users.map((_user: any) => (
              <tr key={_user.id}>
                <td className='border border-gray-300 px-4 py-2'>{_user.id}</td>
                <td className='border border-gray-300 px-4 py-2'>
                  {_user.firstName} {_user.lastName}
                </td>
                <td className='border border-gray-300 px-4 py-2'>{_user.email}</td>
                {/* 추가 필드에 따라 필요한 만큼 td를 추가하세요 */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default user;
