import { GetServerSidePropsContext } from 'next';

import Instance from './config';

export const getLogginedUser = async () => {
  return Instance.get('/auth/authenticate');
};

export const login = async (email: string, password: string) => {
  return Instance.post('/auth/login', { email, password });
};

export const logout = async () => {
  return Instance.post('/auth/logout');
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
    context.res.setHeader('Set-Cookie', [
      'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
      'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    ]);
    return null;
  }

  return res.data;
};
