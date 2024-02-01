import React from 'react';

import PackageOption from './PackageOption';

const SelectOption = () => {
  return (
    <div className='flex w-full justify-center'>
      <div className='flex flex-col md:w-4/5 items-center'>
        <div className='flex items-center w-full md:w-3/5 mt-8 px-3 md:px-0'>
          <div className='w-2.5 h-10 bg-blue-700 mr-3' />
          <div className='text-black text-3xl font-medium'>Package options</div>
        </div>

        <PackageOption type='airportToHotel' />
        <PackageOption type='hotelToAirport' />
        <PackageOption type='hotelToHotel' />
      </div>
    </div>
  );
};

export default SelectOption;
