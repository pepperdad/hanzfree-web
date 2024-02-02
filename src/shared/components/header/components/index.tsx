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

  const redirectUrl = (url: string) => {
    toggleMobileMenu();
    router.push(url);
  };

  return (
    <div className='pb-20'>
      <header className='fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4 bg-blue-600 rounded-bl-5 rounded-br-5'>
        <div className='flex items-center justify-between'>
          {/* pc header */}
          <div className='flex'>
            <button
              className='flex items-center cursor-pointer'
              onClick={() => scrollToSection('section1')}
            >
              <Image src='/logo.svg' alt='hanzfree Logo' width={160} height={48} />
            </button>

            <nav className='ml-10 hidden md:flex md:flex-row'>
              <button onClick={() => scrollToSection('section2')} className='headerNav'>
                Introduction of Service
              </button>
              <button onClick={() => scrollToSection('section3')} className='headerNav'>
                Customer Guide
              </button>

              <button onClick={() => router.push('/reservation')} className='headerNav'>
                Go to reservation
              </button>

              {headerData && (
                <button onClick={() => router.push('/booking')} className='headerNav'>
                  Bookings
                </button>
              )}
            </nav>
          </div>
          {headerData ? (
            <div className='hidden md:flex items-center gap-6 '>
              <div className='text-center flex-center text-slate-100 font-bold'>
                <span>Welcome!</span>
                <span className='ml-2'>
                  {headerData.firstName.toUpperCase()} {headerData.lastName.toUpperCase()}
                </span>
              </div>

              <Button onClick={handleLogout}>Sign out</Button>
            </div>
          ) : (
            <div className='hidden md:block'>
              <Button onClick={() => router.push('/login')}>Sign in</Button>
              <Button
                buttonStyle='ml-5 bg-gray-400 hover:bg-gray-500'
                onClick={() => router.push('/signup')}
              >
                Sign up
              </Button>
            </div>
          )}

          {/* mobile */}
          <button
            className='p-2 rounded-lg md:hidden flex-center hover:bg-blue-700'
            onClick={toggleMobileMenu}
          >
            <Image src='/assets/header/hamburger.svg' alt='Menu' width={30} height={30} />
          </button>
        </div>

        {/* mobile menu */}
        <nav
          className={`${
            isMobileMenuOpen ? 'absolute' : 'hidden'
          } top-0 left-0 w-screen h-screen bg-gray-100 py-16 px-6`}
        >
          <button
            onClick={toggleMobileMenu}
            className='absolute p-2 rounded-lg right-6 top-4 hover:bg-gray-300 flex-center'
          >
            <Image src='/assets/header/x_button.svg' alt='x' width={28} height={28} />
          </button>

          <div className='flex flex-col'>
            <div
              onClick={() => {
                toggleMobileMenu();
                scrollToSection('section1');
              }}
              className='flex cursor-pointer h-20'
            >
              <Image src='/assets/header/logo_string.svg' alt='logo' width={1500} height={80} />
            </div>
            <div className='my-4 flex flex-col'>
              {headerData ? (
                <>
                  {/* <div className='text-2xl text-center font-bold py-2'>
                    Welcome! {headerData.firstName.toUpperCase()}{' '}
                    {headerData.lastName.toUpperCase()}, <br /> Enjoy our service!
                  </div> */}
                  <Button onClick={() => redirectUrl('/booking')}>My Bookings</Button>
                  <Button buttonStyle='mt-2 bg-gray-400 hover:bg-gray-500' onClick={handleLogout}>
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => redirectUrl('/login')}>Sign in</Button>
                  <Button
                    buttonStyle='mt-2 bg-gray-400 hover:bg-gray-500'
                    onClick={() => redirectUrl('/signup')}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>

            <div
              className='mt-2 p-2 text-2xl text-center border-y rounded-md hover:bg-gray-300 font-extralight'
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
              onClick={() => redirectUrl('/reservation')}
            >
              Go to reservation
            </div>
            {headerData && (
              <div
                className='p-2 mb-10 text-2xl text-center border-y rounded-md hover:bg-gray-300 font-extralight'
                onClick={() => redirectUrl('/booking')}
              >
                Bookings
              </div>
            )}
          </div>
          <div className='flex flex-col gap-3 absolute bottom-4'>
            Contact Info.
            <div className='flex items-center'>
              <Image src='/assets/footer/instagram_icon.svg' alt='insta' width={30} height={30} />
              <span className='ml-2'>@hanzfree_official</span>
            </div>
            <div className='flex items-center'>
              <Image src='/assets/footer/line_talk.svg' alt='line' width={30} height={30} />
              <span className='ml-2'>@hanzfree</span>
            </div>
            <div className='flex items-center'>
              <Image src='/assets/footer/gmail.svg' alt='gmail' width={30} height={30} />
              <span className='ml-2'>hanzfree.official@gmail.com</span>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
