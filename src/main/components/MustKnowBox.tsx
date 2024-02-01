import React from 'react';

interface MustKnowBoxProps {
  content: string;
}

const MustKnowBox = ({ content }: MustKnowBoxProps) => {
  return (
    <div className='flex-center p-4 bg-white rounded-2xl md:rounded-3xl shadow border-2 border-blue-700'>
      <span className='text-zinc-800 text-sm md:text-base font-normal'>{content}</span>
    </div>
  );
};

export default MustKnowBox;
