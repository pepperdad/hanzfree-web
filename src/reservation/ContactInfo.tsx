import React from 'react';

import { UserProfileData } from '@shared/types';

import UserInfo from './UserInfo';

interface ContactInfoProps {
  userData: UserProfileData;
  dialCode: string;
  phone: string;
  contactId: string;
}

const ContactInfo = ({ userData, dialCode, phone, contactId }: ContactInfoProps) => {
  return (
    <div className='w-full'>
      <div className='flex items-center mt-8'>
        <div className='w-2.5 h-10 bg-blue-700 mr-3' />
        <div className='text-black text-3xl font-medium'>Contact Info</div>
      </div>

      <div className='my-2 text-neutral-600 text-lg font-normal'>
        We&rsquo;ll only contact you if there&rsquo;s any updates to your booking
      </div>

      <div className='flex flex-col rounded-2xl border border-zinc-500 p-4'>
        <UserInfo title='Name' content={`${userData.firstName} ${userData.lastName}`} />
        <UserInfo
          title='Phone Number'
          content={
            userData.phoneNumber
              ? `${userData.dialCode}-${userData.phoneNumber}`
              : `${dialCode}-${phone}`
          }
        />

        <div className='flex py-2 pb-3'>
          <div className='text-neutral-600 md:text-xl w-1/2'>
            Contact Info
            <span className='text-xs hidden md:block'> (for updates your booking)</span>
          </div>
          <div className='text-black md:text-xl font-semibold grow'>{contactId}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
