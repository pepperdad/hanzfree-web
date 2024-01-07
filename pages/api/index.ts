import { GetServerSidePropsContext } from 'next';

import Instance from './config';

export const getLogginedUser = async () => {
  return Instance.get('/auth/authenticate');
};

export const login = async (email: string, password: string) => {
  return Instance.post('/auth/login', { email, password });
};

export const fetchUserData = async (context: GetServerSidePropsContext) => {
  const { cookie } = context.req.headers;
  // 쿠키가 없거나 토큰이 없는 경우 null 반환
  if (!cookie || !cookie.includes('access_token') || !cookie.includes('refresh_token')) {
    return null;
  }

  const res = await Instance(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/authenticate`, {
    headers: {
      Cookie: cookie || '',
    },
  });

  if (res.status === 401) {
    return null;
  }

  return {
    email: res.data.email,
    firstName: res.data.firstName,
    lastName: res.data.lastName,
    currentRefreshTokenExp: res.data.currentRefreshTokenExp,
    role: res.data.role,
    createdAt: res.data.createdAt,
  };
};
