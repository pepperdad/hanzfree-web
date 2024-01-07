import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { getLogginedUser } from '@pages/api';

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

const index = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getLogginedUser()
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {
        router.push('/admin');
      });
  }, []);

  return (
    <div>
      dashboard
      <p>{user?.firstName} 님 환영합니다!</p>
    </div>
  );
};

export default index;
