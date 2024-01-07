import React, { ReactElement, ReactNode } from 'react';

import Header from '@shared/components/header/components';

interface LayoutProps {
  children?: ReactNode;
  headerData?: any;
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
    </div>
  );
};

export default Layout;
