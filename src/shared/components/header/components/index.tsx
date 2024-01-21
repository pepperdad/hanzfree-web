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
      <header className='fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-4 bg-blue-600 rounded-bl-5 rounded-br-5'>
        <div className='flex items-center justify-between'>
          {/* pc header */}
          <button
            className='flex items-center cursor-pointer'
            onClick={() => scrollToSection('section1')}
          >
            <Image src='/logo.svg' alt='hanzfree Logo' width={200} height={48} />
          </button>

          <nav className='hidden md:flex md:flex-row md:gap-4'>
            <button
              onClick={() => scrollToSection('section2')}
              className='text-white hover:bg-blue-700 px-3 py-2 rounded-lg hover:text-slate-100 transition duration-250 ease-in-out'
            >
              Introduction of Service
            </button>
            <button
              onClick={() => scrollToSection('section3')}
              className='text-white hover:bg-blue-700 px-3 py-2 rounded-lg hover:text-slate-100 transition duration-250 ease-in-out'
            >
              Customer Guide
            </button>

            <button
              onClick={() => router.push('/reservation')}
              className='text-white hover:bg-blue-700 px-3 py-2 rounded-lg hover:text-slate-100 transition duration-250 ease-in-out'
            >
              Go to reservation
            </button>

            <button
              onClick={() => router.push('/booking')}
              className='text-white hover:bg-blue-700 px-3 py-2 rounded-lg hover:text-slate-100 transition duration-250 ease-in-out'
            >
              Bookings
            </button>

            {headerData ? (
              <>
                <div className='text-center flex-center text-slate-100 fadeIn font-semibold'>
                  Hello! {headerData.firstName.toUpperCase()} {headerData.lastName.toUpperCase()}
                </div>

                {/* <Button onClick={handleLogout}>Sign out</Button> */}
              </>
            ) : (
              <>
                <Button onClick={() => router.push('/login')}>Sign in</Button>
                <Button
                  buttonStyle='bg-gray-400 hover:bg-gray-500'
                  onClick={() => router.push('/signup')}
                >
                  Sign up
                </Button>
              </>
            )}
          </nav>

          <button
            className='p-2 rounded-lg md:hidden flex-center hover:bg-blue-700'
            onClick={toggleMobileMenu}
          >
            {/* 햄버거 메뉴 아이콘 */}
            <Image src='/assets/hamburger.svg' alt='Menu' width={30} height={30} />
          </button>
        </div>

        <nav
          className={`${
            isMobileMenuOpen ? 'absolute' : 'hidden'
          } top-0 left-0 w-screen h-screen bg-gray-100 py-16 px-6`}
        >
          <button
            onClick={toggleMobileMenu}
            className='absolute p-2 rounded-lg right-6 top-5 hover:bg-gray-300 flex-center'
          >
            <Image src='/assets/x_button.svg' alt='x' width={28} height={28} />
          </button>

          <div className='flex flex-col'>
            <Image src='/assets/logo_string2.svg' alt='x' width={28} height={80} />
            <div
              className='mt-10 p-2 text-2xl text-center border-y rounded-md hover:bg-gray-300 font-extralight'
              onClick={() => {
                toggleMobileMenu();
                scrollToSection('section1');
              }}
            >
              Home
            </div>
            <div
              className='p-2 text-2xl text-center border-y rounded-md hover:bg-gray-300 font-extralight'
              onClick={() => {
                toggleMobileMenu();
                scrollToSection('section2');
              }}
            >
              Introduce of Service
            </div>

            <div
              className='p-2 text-2xl text-center border-y rounded-md hover:bg-gray-300 font-extralight'
              onClick={() => {
                toggleMobileMenu();
                scrollToSection('section3');
              }}
            >
              Customer Guide
            </div>

            <div
              className='p-2 text-2xl text-center border-y rounded-md hover:bg-gray-300 font-extralight'
              onClick={() => router.push('/reservation')}
            >
              Go to reservation
            </div>
            <div
              className='p-2 mb-10 text-2xl text-center border-y rounded-md hover:bg-gray-300 font-extralight'
              onClick={() => router.push('/booking')}
            >
              Bookings
            </div>
            {headerData ? (
              <>
                <div className='text-3xl text-center mb-4 font-extralight pt-2'>
                  Hello! {headerData.firstName.toUpperCase()} {headerData.lastName.toUpperCase()},{' '}
                  Enjoy our service!
                </div>
                <Button onClick={handleLogout}>Sign out</Button>
              </>
            ) : (
              <>
                <Button onClick={() => router.push('/login')}>Sign in</Button>
                <Button
                  buttonStyle='mt-2 bg-gray-400 hover:bg-gray-500'
                  onClick={() => router.push('/signup')}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
