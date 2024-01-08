// 헤더 컴포넌트

import Image from 'next/image';
import { useRouter } from 'next/router';

import Instance from '@pages/api/config';
import Button from '@shared/components/Button';

const Header = ({ headerData }: any) => {
  const router = useRouter();

  const handleLogout = async () => {
    sessionStorage.removeItem('recoil-persist');
    try {
      const res = await Instance.post('/auth/logout');

      if (res.status === 201) router.reload();
    } catch (err: any) {
      console.log('err', err);
    }
  };

  const scrollToSection = (section: string) => {
    const toScroll = document.getElementById(section);

    if (toScroll) {
      const sectionPosition = toScroll.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: sectionPosition - 80, behavior: 'smooth' });
    } else {
      router.push('/').then(() => {
        scrollToSection(section);
      });
    }
  };

  return (
    <div className='pb-20'>
      <header className='fixed top-0 left-0 right-0 flex items-center justify-between px-10 py-2 bg-blue-600 duration-500 ease-in-out h-20 rounded-bl-[20px] rounded-br-[20px] z-50'>
        <div className='flex items-center cursor-pointer'>
          <button onClick={() => scrollToSection('section1')}>
            <Image src='/logo.svg' alt='hanzfree Logo' width={240} height={50} />
          </button>
        </div>
        <div className='gap-12 flex-center'>
          <button onClick={() => scrollToSection('section2')}>서비스 소개</button>
          <button onClick={() => scrollToSection('section3')}>가이드</button>

          {headerData ? (
            <>
              <div>
                {headerData?.firstName}
                {headerData?.lastName}
              </div>
              <Button onClick={handleLogout}>로그아웃</Button>
            </>
          ) : (
            <Button onClick={() => router.push('/login')}>로그인</Button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
