import React from 'react';

import Image from 'next/image';

import { priceTable } from '@main/const';

import DescripctionTitle from './DescripctionTitle';
import GuideBox from './GuideBox';

const Section4 = () => {
  return (
    <div id='section3' className='pt-10'>
      <div className='flex flex-col items-center md:block'>
        <DescripctionTitle content='Customer Guide' />
        <div className='text-gray-700 font-normal mt-4'>
          How can I use this luggage delivery service?
        </div>

        {/* pc */}
        <div className='hidden md:flex md:flex-row flex-wrap justify-between mt-10'>
          <GuideBox
            number={1}
            content='Make a reservation through our website'
            img='/assets/landing/guide1.png'
          />
          <GuideBox
            number={2}
            content='Take a photo of the booked luggage and upload it.'
            img='/assets/landing/guide2.png'
          />

          <GuideBox
            number={3}
            content='Hand over your luggage to the staff at the designated location.'
            img='/assets/landing/guide3.png'
          />

          <GuideBox
            number={4}
            content='Retrieve the delivered luggage upon arrival at your destination.'
            img='/assets/landing/guide4.png'
          />
        </div>
        {/* mobile */}
        <div className='flex flex-col md:hidden mt-10 w-full'>
          <div className='flex'>
            <GuideBox
              number={1}
              content='Make a reservation through our website'
              img='/assets/landing/guide1.png'
            />
            <GuideBox
              number={2}
              content='Take a photo of the booked luggage and upload it.'
              img='/assets/landing/guide2.png'
            />
          </div>

          <div className='flex'>
            <GuideBox
              number={3}
              content='Hand over your luggage to the staff at the designated location.'
              img='/assets/landing/guide3.png'
            />
            <GuideBox
              number={4}
              content='Retrieve the delivered luggage upon arrival at your destination.'
              img='/assets/landing/guide4.png'
            />
          </div>
        </div>

        <div className='flex flex-col items-center mt-20 md:mt-28'>
          <DescripctionTitle content='Price Table' />
          <div className='text-zinc-800 font-normal mt-4 md:mt-8'>
            HanzFree can deliver not only luggage but also a wide variety of items at reasonable
            prices.
          </div>

          <div className='sm:hidden block relative w-full h-80'>
            <Image
              className='object-contain'
              src='/assets/landing/price_table.png'
              alt='price_table'
              layout='fill'
            />
          </div>

          <table className='hidden sm:table w-full mt-10 border border-stone-200 shadow-lg'>
            <thead className='h-12'>
              <tr className='bg-blue-700 text-white font-medium'>
                <th className='border-x'>Luggage Size</th>
                <th className='border-x'>Airport → Accommodation</th>
                <th className='border-x'>Accommodation → Airport</th>
                <th className='border-x'>Accommodation → Accommodation</th>
              </tr>
            </thead>
            <tbody>
              {priceTable.map((rowData, i) => (
                <tr key={`table-${i}`} className='h-12'>
                  <td className='border text-center text-blue-600 font-medium'>
                    {rowData.luggageSize}
                  </td>
                  <td className='border text-center font-bold'>{rowData.airportToAccommodation}</td>
                  <td className='border text-center font-bold'>{rowData.accomodationToAirport}</td>
                  <td className='border text-center font-bold'>
                    {rowData.accomodationToAccommodation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Section4;
