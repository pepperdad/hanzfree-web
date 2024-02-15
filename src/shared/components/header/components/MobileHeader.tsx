import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '@shared/components/Button';
import { UserProfile } from '@shared/types';

interface MobileHeaderProps extends UserProfile {
  scrollToSection: (section: string) => void;
  isMobileMenuOpen: boolean;
  toggleMenu: VoidFunction;
  handleLogout: VoidFunction;
}

const MobileHeader = ({
  userData,
  scrollToSection,
  isMobileMenuOpen,
  toggleMenu,
  handleLogout,
}: MobileHeaderProps) => {
  const moveToSection = (section: string) => {
    toggleMenu();
    scrollToSection(section);
  };

  const redirectUrl = (url: string) => {
    const router = useRouter();

    toggleMenu();
    router.push(url);
  };
  return (
    <nav
      className={`${
        isMobileMenuOpen ? 'absolute' : 'hidden'
      } top-0 left-0 w-screen h-screen bg-gray-100 py-16 px-6`}
    >
      <button
        onClick={toggleMenu}
        className='absolute p-2 rounded-lg right-6 top-4 hover:bg-gray-300 flex-center'
      >
        <Image src='/assets/header/x_button.svg' alt='x' width={28} height={28} />
      </button>

      <div className='flex flex-col'>
        <div onClick={() => moveToSection('section1')} className='flex cursor-pointer h-20'>
          <Image src='/assets/header/logo_string.svg' alt='logo' width={1500} height={80} />
        </div>
        <div className='my-4 flex flex-col'>
          {userData ? (
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
          onClick={() => moveToSection('section1')}
        >
          Home
        </div>
        <div
          className='p-2 text-2xl text-center border-y rounded-md hover:bg-gray-300 font-extralight'
          onClick={() => moveToSection('section2')}
        >
          Introduce of Service
        </div>

        <div
          className='p-2 text-2xl text-center border-y rounded-md hover:bg-gray-300 font-extralight'
          onClick={() => moveToSection('section3')}
        >
          Customer Guide
        </div>

        <div
          className='p-2 text-2xl text-center border-y rounded-md hover:bg-gray-300 font-extralight'
          onClick={() => redirectUrl('/reservation')}
        >
          Go to reservation
        </div>
        {userData && (
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
  );
};

export default MobileHeader;
