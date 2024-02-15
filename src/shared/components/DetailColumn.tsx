import React from 'react';

const DetailColumn = ({ label, content }: any) => {
  return (
    <div className='flex py-2 border-b'>
      <div className='flex-center text-gray-500 text-center text-sm md:text-base w-1/2'>
        {label}
      </div>
      <div className='flex-center text-gray-800 font-medium text-center text-sm  md:text-base w-1/2'>
        {content}
      </div>
    </div>
  );
};

export default DetailColumn;
