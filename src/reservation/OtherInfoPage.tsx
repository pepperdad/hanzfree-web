import { useEffect } from 'react';

import { PageProp } from '@shared/types';

import BasicInfo from './BasicInfo';
import EnterForm from './EnterForm';

const OtherInfoPage = ({ userData }: PageProp) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className='relative flex w-full justify-center md:bg-[#f5f5f5]'>
      {/* <div className='flex flex-col w-full md:w-4/5 items-center mx-4 bg-white my-6 py-10 rounded-3xl'>
        <div className='flex' />
      </div> */}
      <div className='flex flex-col w-full md:w-4/5 items-center mx-1 md:mx-4 bg-white md:my-6 py-10 rounded-3xl'>
        <BasicInfo />

        <EnterForm userData={userData} />
      </div>
    </div>
  );
};

export default OtherInfoPage;
