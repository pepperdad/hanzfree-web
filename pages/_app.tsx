import { useEffect } from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { RecoilRoot } from 'recoil';

import NextNProgress from 'nextjs-progressbar';
import 'intl-tel-input/build/css/intlTelInput.css';
import 'react-calendar/dist/Calendar.css';
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
        <link href='https://fonts.gstatic.com' data-noprefix />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap'
          rel='stylesheet'
          data-noprefix
        />
        <title>HanzFree | Travel Light with HanzFree</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='Luggage delivery service' />

        <meta property='og:title' content='HanzFree' key='og-title' />
        <meta
          property='og:description'
          content='Travel Light with HanzFree, enjoy to the fullest!'
          key='og-desc'
        />
        <meta property='og:url' content='https://www.hanzfree.co.kr' key='og-url' />
        <meta property='og:image' content='/logo_favicon.png' key='og-image' />
        <meta property='og:site_name' content='hanzfreesite' key='og-site' />

        <meta name='color-scheme' content='light only' />
        <meta name='supported-color-schemes' content='light' />
        {/* Favicon 설정 */}
        <link rel='icon' href='/logo_favicon.png' />
      </Head>
      <NextNProgress
        color='#5ec4ff'
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
      <script
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places&language=en`}
      />
    </RecoilRoot>
  );
}

export default MyApp;
