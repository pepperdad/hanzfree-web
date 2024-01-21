import { useEffect } from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { RecoilRoot } from 'recoil';

import 'intl-tel-input/build/css/intlTelInput.css';
import 'react-calendar/dist/Calendar.css';
import '../styles/globals.css';

// export const metadata = {
//   title: {
//     default: '이정민 블로그',
//     template: '이정민 블로그 | %s',
//   },
//   description: '프론트엔드 개발자가 되고 싶은 취준생의 블로그',
//   icons: {
//     icon: '/favicon.ico',
//   },
// };

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
          alert('Your login has expired. Please log in again.');
        }
      }
    }
  };

  useEffect(() => {
    checkLogin();
  }, [parsedData?.userState]);

  return (
    <RecoilRoot>
      <Head>
        <title>HanzFree | Travel Light with HanzFree</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='Luggage delivery service' />

        <meta property='og:title' content='HanzFree' key='og-title' />
        <meta
          property='og:description'
          content='Travel Light with HanzFree, enjoy to the fullest!'
          key='og-desc'
        />
        <meta property='og:url' content='https://hanzfree.co.kr' key='og-url' />
        <meta property='og:image' content='/logo_favicon.png' key='og-image' />
        <meta property='og:site_name' content='hanzfreesite' key='og-site' />

        <meta name='color-scheme' content='light only' />
        <meta name='supported-color-schemes' content='light' />
        {/* Favicon 설정 */}
        <link rel='icon' href='/logo_favicon.png' />
      </Head>
      {/* <Header /> */}
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
