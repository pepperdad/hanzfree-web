import React from 'react';

import { operationHourTable } from '@main/const';

const Section5 = () => {
  return (
    <div>
      <div className='flex flex-col items-center mt-20 md:mt-32'>
        <h1 className='text-blue-700 text-4xl md:text-6xl font-medium'>Operation Hours</h1>
        <table className='w-full mt-5 md:mt-10 border border-stone-200 shadow-lg'>
          <thead className='h-12'>
            <tr className='bg-blue-700 text-white font-light md:font-medium'>
              <th className='border-x' aria-hidden='true' />
              <th className='border-x'>Drop-off</th>
              <th className='border-x'>Pick-up</th>
            </tr>
          </thead>
          <tbody>
            {operationHourTable.map((rowData, index) => (
              <tr key={`table-${index}`} className='h-12'>
                <td className='border text-center text-blue-600 font-normal md:font-medium'>
                  {rowData.method}
                </td>
                <td className='border text-center font-normal md:font-medium'>{rowData.dropOff}</td>
                <td className='border text-center font-normal md:font-medium'>{rowData.pickUp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Section5;
