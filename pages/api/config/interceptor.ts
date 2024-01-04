import { ApiError } from 'next/dist/server/api-utils';

import { AxiosInstance } from 'axios';

const interceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (res) => res.data,
    ({ response }) => {
      console.log('error response', response);
      const error = {
        status: response.data.code,
        message: `${response.data.data.error}`,
      };

      return Promise.reject<ApiError>(error);
    },
  );
};

export default interceptor;
