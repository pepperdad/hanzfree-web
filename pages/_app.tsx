import { useEffect } from 'react';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { RecoilRoot } from 'recoil';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  let recoilPersist: any;
  let parsedData: any;

  if (typeof window !== 'undefined') {
    // 클라이언트 측에서만 실행되는 코드 블록
    recoilPersist = localStorage.getItem('recoil-persist');
    parsedData = JSON.parse(recoilPersist);
  }

  const checkLogin = () => {
    if (recoilPersist) {
      if (parsedData?.userState) {
        const currentTimeUtc = new Date().toUTCString(); // UTC 현재 시간

        const refrshTokenExpTimeUtc = new Date(
          parsedData.userState.currentRefreshTokenExp,
        ).toUTCString(); // refresh token 만료 시간

        if (refrshTokenExpTimeUtc < currentTimeUtc) {
          localStorage.removeItem('recoil-persist');
          router.reload();
          alert('로그인 시간이 만료되었습니다.');
        }
      }
    }
  };

  useEffect(() => {
    checkLogin();
  }, [parsedData?.userState]);

  return (
    <RecoilRoot>
      {/* <Header /> */}
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
