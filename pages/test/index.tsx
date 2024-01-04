import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { fetchUser } from '@shared/hooks/fetchUser';
import { User } from '@shared/types';

const Page = () => {
  const { push, pathname } = useRouter();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchUser(setUser, push, pathname);
  }, []);

  return (
    <div>
      <ul>
        <li>email: {user?.email}</li>
      </ul>
    </div>
  );
};

export default Page;
