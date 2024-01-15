import { ApiError } from 'next/dist/server/api-utils';

import { AxiosInstance } from 'axios';

const interceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        const routerPath = window.location.pathname;
        const recoilPersist = localStorage.getItem('recoil-persist');

        if (recoilPersist) {
          const parsedData = JSON.parse(recoilPersist);

          if (parsedData?.userState) {
            const currentTimeUtc = new Date().toUTCString(); // UTC 현재 시간

            const refrshTokenExpTimeUtc = new Date(
              parsedData.userState.currentRefreshTokenExp,
            ).toUTCString(); // refresh token 만료 시간

            if (refrshTokenExpTimeUtc < currentTimeUtc) {
              localStorage.removeItem('recoil-persist');
              alert('로그인이 만료되었습니다!');
              window.location.href = `/login?from=${routerPath}`;
              return Promise.reject(); // 리디렉션 전에 요청을 거부합니다.
            }
          }
        }
      }

      return config;
    },
    (error) => {
      // 요청을 보내기 전에 에러가 발생한 경우 처리
      // console.log('error request', error);
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (res) => {
      // console.log('inter res', res);
      return res.data;
    },
    (error) => {
      // console.log('inter error res', error.response);
      // const errorResponse = {
      //   status: error.response.data.status,
      //   message: `${error.response.data.data.error}`,
      // };

      return error.response.data;
    },
  );
};

export default interceptor;
