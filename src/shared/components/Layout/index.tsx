import React, { ReactElement, ReactNode } from 'react';

import Footer from '@shared/components/footer/components';
import Header from '@shared/components/header/components';
import { UserProfile } from '@shared/types';

interface LayoutProps {
  children?: ReactNode;
  headerData?: UserProfile;
}

const Layout = ({ children, headerData, ...props }: LayoutProps) => {
  return (
    <div>
      <Header headerData={headerData} />
      {React.Children.map(children, (child) => {
        // children이 유효한 React 요소인지 확인
        if (React.isValidElement(child)) {
          return React.cloneElement(child as ReactElement, props);
        }
        return child;
      })}
      <Footer />
    </div>
  );
};

export default Layout;
