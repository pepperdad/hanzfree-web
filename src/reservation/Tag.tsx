import React from 'react';

interface TagProps {
  content: string;
}

const Tag = ({ content }: TagProps) => {
  return (
    <div className='text-neutral-500 py-[2px] px-2 rounded-md shadow bg-gray-200 text-sm'>
      {content}
    </div>
  );
};

export default Tag;
