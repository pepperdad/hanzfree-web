import axios from 'axios';

import interceptor from './interceptor';

const createInterceptor = () => {
  const baseInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });
  baseInstance.defaults.withCredentials = true;
  interceptor(baseInstance);

  return baseInstance;
};

const Instance = createInterceptor();

export default Instance;
