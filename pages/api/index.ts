import Instance from './config';

export const getLogginedUser = async () => {
  return Instance.get('/auth/authenticate');
};

export const login = async (email: string, password: string) => {
  return Instance.post('/auth/login', { email, password });
};
