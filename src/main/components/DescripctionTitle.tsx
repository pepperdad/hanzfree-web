import React from 'react';

interface DescripctionTitleProps {
  content: string;
  className?: string;
}

const DescripctionTitle = ({ content, className }: DescripctionTitleProps) => {
  return (
    <div className={`text-blue-700 text-4xl md:text-5xl font-medium pb-2 ${className}`}>
      {content}
    </div>
  );
};

export default DescripctionTitle;
