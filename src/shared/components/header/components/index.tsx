import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import Instance from '@pages/api/config';

import Button from '@shared/components/Button';

const Header = ({ headerData }: any) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    sessionStorage.removeItem('recoil-persist');
    try {
      const res = await Instance.post('/auth/logout');
      if (res.status === 201) router.reload();
    } catch (err) {
      console.error('Logout Error', err);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (section: string) => {
    const toScroll = document.getElementById(section);
    if (toScroll) {
      const sectionPosition = toScroll.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: sectionPosition - 80, behavior: 'smooth' });
    } else {
      router.push('/').then(() => scrollToSection(section));
    }
  };

  return (
    <div className='pb-20'>
      <header className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-2 bg-blue-600 h-20 rounded-bl-[20px] rounded-br-[20px] md:flex-row'>
        <button
          className='flex items-center cursor-pointer'
          onClick={() => scrollToSection('section1')}
        >
          <Image src='/logo.svg' alt='hanzfree Logo' width={240} height={50} />
        </button>

        <button className='md:hidden' onClick={toggleMobileMenu}>
          {/* 햄버거 메뉴 아이콘 */}
          <Image src='/assets/hamburger-icon.png' alt='Menu' width={30} height={30} />
        </button>

        <nav
          className={`${
            isMobileMenuOpen ? 'flex' : 'hidden'
          } flex-col md:flex md:flex-row md:gap-12`}
        >
          <button onClick={() => scrollToSection('section2')}>서비스 소개</button>
          <button onClick={() => scrollToSection('section3')}>가이드</button>

          {headerData ? (
            <>
              <div>
                {headerData?.firstName} {headerData?.lastName}
              </div>
              <Button onClick={handleLogout}>로그아웃</Button>
            </>
          ) : (
            <Button onClick={() => router.push('/login')}>로그인</Button>
          )}
        </nav>
      </header>

      {/* 모바일 메뉴 내용 */}
      <div
        className={`absolute top-20 left-0 right-0 p-5 bg-white ${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:hidden`}
      >
        {/* 여기에 모바일 메뉴 내용 */}
      </div>
    </div>
  );
};

export default Header;
