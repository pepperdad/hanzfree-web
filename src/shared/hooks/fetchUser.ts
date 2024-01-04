import { Dispatch, SetStateAction } from 'react';

import { NextRouter } from 'next/router';

import { getLogginedUser } from '@pages/api';
import { User } from '@shared/types';

export const fetchUser = async (
  setUser: Dispatch<SetStateAction<User | undefined>>,
  push: NextRouter['push'],
  pathname: string,
) => {
  try {
    const res = await getLogginedUser();

    if (res.status === 200) {
      setUser(res.data);
    }
  } catch (e) {
    console.log('e', e);
    push({
      pathname: '/login',
      query: { from: pathname },
    });
  }
};
