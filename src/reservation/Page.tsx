import React from 'react';

import PageIntro from './PageIntro';
import SelectOption from './SelectOption';

const Page = () => {
  return (
    <div className='py-10 flex flex-col items-center'>
      <PageIntro />
      <SelectOption />
    </div>
  );
};

export default Page;
