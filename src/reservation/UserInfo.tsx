import React from 'react';

interface UserInfoProps {
  title: string;
  content: string;
}

const UserInfo = ({ title, content }: UserInfoProps) => {
  return (
    <div className='flex py-2'>
      <div className='text-neutral-600 md:text-xl w-1/2'>{title}</div>
      <div className='text-neutral-600 md:text-xl font-semibold grow'>{content.toUpperCase()}</div>
    </div>
  );
};

export default UserInfo;
