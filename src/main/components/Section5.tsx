import React from 'react';

const Section5 = () => {
  const tableData = [
    {
      method: 'Airport -> Accommodation',
      dropOff: '08:00 - 17:00',
      pickUp: 'Arrival by 22:00 on the same day',
    },
    {
      method: 'Accommodation -> Airport',
      dropOff: 'Before 11:00',
      pickUp: 'from 15:00 on the same day.',
    },
    {
      method: 'Accommodation -> Accommodation',
      dropOff: 'Before 11:00',
      pickUp: 'Arrival by 22:00 on the same day',
    },
  ];
  return (
    <div>
      <div className='flex flex-col items-center mt-10'>
        <h1 className='text-blue-700 text-4xl md:text-7xl font-medium'>Operation Hours</h1>
        <table className='w-full mt-10 border border-stone-200 shadow-lg'>
          <thead className='h-12'>
            <tr className='bg-blue-700 text-white font-medium'>
              <th className='border-x' aria-hidden='true' />
              <th className='border-x'>Drop-off</th>
              <th className='border-x'>Pick-up</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((rowData, index) => (
              <tr key={`table-${index}`} className='h-12'>
                <td className='border text-center text-blue-600 font-medium'>{rowData.method}</td>
                <td className='border text-center font-bold'>{rowData.dropOff}</td>
                <td className='border text-center font-bold'>{rowData.pickUp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Section5;
