import React from 'react';

import { UserProfile } from '@shared/types';

import UserInfo from './UserInfo';

interface ContactInfoProps {
  userData: UserProfile;
  dialCode: string;
  phone: string;
}

const ContactInfo = ({ userData, dialCode, phone }: ContactInfoProps) => {
  return (
    <div className='w-full'>
      <div className='flex items-center mt-8'>
        <div className='w-2.5 h-10 bg-blue-700 mr-3' />
        <div className='text-black text-3xl font-medium'>Contact Info</div>
      </div>

      <div className='my-2 text-neutral-600 text-lg font-normal'>
        We&rsquo;ll only contact you if there&rsquo;s any updates to your booking
      </div>

      <div className='rounded-2xl border border-zinc-500 p-4'>
        <UserInfo title='First Name' content={userData.firstName} />
        <UserInfo title='Last Name' content={userData.lastName} />
        <UserInfo
          title='Phone Number'
          content={
            userData.phoneNumber
              ? `${userData.dialCode}-${userData.phoneNumber}`
              : `${dialCode}-${phone}`
          }
        />

        <div className='flex py-2'>
          <div className='text-neutral-600 text-xl w-1/2'>Email(for updates your booking)</div>
          <div className='text-neutral-600 text-xl font-semibold grow'>{userData.email}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
