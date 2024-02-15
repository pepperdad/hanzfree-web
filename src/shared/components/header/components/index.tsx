import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { logout } from '@pages/api';
import { UserProfile } from '@shared/types';

import MobileHeader from './MobileHeader';
import PcHeader from './PcHeader';

const Header = ({ userData }: UserProfile) => {
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    sessionStorage.removeItem('recoil-persist');
    try {
      const res = await logout();
      if (res.status === 201) router.reload();
    } catch (err) {
      console.error('Logout Error', err);
    }
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
      <header className='fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4 bg-blue-600 rounded-bl-5 rounded-br-5'>
        <PcHeader
          userData={userData}
          scrollToSection={scrollToSection}
          toggleMenu={toggleMobileMenu}
          handleLogout={handleLogout}
        />
        <MobileHeader
          userData={userData}
          scrollToSection={scrollToSection}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMenu={toggleMobileMenu}
          handleLogout={handleLogout}
        />
      </header>
    </div>
  );
};

export default Header;
