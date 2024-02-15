import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '@shared/components/Button';
import { UserProfile } from '@shared/types';

interface PcHeaderProps extends UserProfile {
  scrollToSection: (section: string) => void;
  toggleMenu: VoidFunction;
  handleLogout: VoidFunction;
}

const PcHeader = ({ userData, scrollToSection, toggleMenu, handleLogout }: PcHeaderProps) => {
  const router = useRouter();

  return (
    <div className='flex items-center justify-between'>
      {/* pc header */}
      <div className='flex'>
        <button
          className='flex items-center cursor-pointer mb-2'
          onClick={() => scrollToSection('section1')}
        >
          <Image src='/logo.svg' alt='hanzfree Logo' width={160} height={40} />
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

          {userData && (
            <button onClick={() => router.push('/booking')} className='headerNav'>
              Bookings
            </button>
          )}
        </nav>
      </div>
      {userData ? (
        <div className='hidden md:flex items-center gap-6 '>
          <div className='text-center flex-center text-slate-100 font-bold'>
            <span>Welcome!</span>
            <span className='ml-2'>
              {userData.firstName.toUpperCase()} {userData.lastName.toUpperCase()}
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
        onClick={toggleMenu}
      >
        <Image src='/assets/header/hamburger.svg' alt='Menu' width={30} height={30} />
      </button>
    </div>
  );
};

export default PcHeader;
