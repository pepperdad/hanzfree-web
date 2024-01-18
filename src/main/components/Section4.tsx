import React from 'react';

const Section4 = () => {
  const tableData = [
    {
      luggageSize: '16 ≤ Luggage Size < 20 (inches)',
      airportToAccommodation: '10000won',
      accomodationToAirport: '10000won',
      accomodationToAccommodation: '10000won',
    },
    {
      luggageSize: '20 ≤ Luggage Size < 24 (inches)',
      airportToAccommodation: '10000won',
      accomodationToAirport: '10000won',
      accomodationToAccommodation: '15000won',
    },
    {
      luggageSize: '24 ≤ Luggage Size < 28 (inches)',
      airportToAccommodation: '20000won',
      accomodationToAirport: '20000won',
      accomodationToAccommodation: '15000won',
    },
    {
      luggageSize: '28(inches) ≤ Luggage Size',
      airportToAccommodation: '25000won',
      accomodationToAirport: '25000won',
      accomodationToAccommodation: '20000won',
    },
    {
      luggageSize: 'HandBag, Briefcase, Shopping Bag',
      airportToAccommodation: '10000won',
      accomodationToAirport: '10000won',
      accomodationToAccommodation: '10000won',
    },
    {
      luggageSize: 'Golf Bag',
      airportToAccommodation: '25000won',
      accomodationToAirport: '25000won',
      accomodationToAccommodation: '20000won',
    },
  ];

  return (
    <div>
      <div className="w-[530px] text-blue-700 text-7xl font-medium font-['Hind']">
        Customer Guide
      </div>
      <div className="w-[528px] h-[21px] text-zinc-800 text-2xl font-normal font-['Roboto']">
        How can I use this luggage delivery service?
      </div>
      <div className='flex justify-between mt-10'>
        <div className='flex flex-col'>
          <div className='w-[30px] h-[30px] bg-neutral-500 rounded-full flex-center text-white'>
            <span>1</span>
          </div>
          <div className='w-[257px] h-[421px] bg-white rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[110px] shadow-inner flex flex-col justify-around items-center'>
            <div className="w-[211px] h-14 text-black text-lg font-normal font-['Roboto'] leading-[25.20px]">
              Make a reservation through our website
            </div>
            <div className='w-[211px] h-[267px] bg-gray-200 rounded-tl-[30px] rounded-tr-[30px] rounded-bl-[30px] rounded-br-[80px]' />
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='w-[30px] h-[30px] bg-neutral-500 rounded-full flex-center text-white'>
            <span>2</span>
          </div>
          <div className='w-[257px] h-[421px] bg-white rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[110px] shadow-inner flex flex-col justify-around items-center'>
            <div className="w-[211px] h-14 text-black text-lg font-normal font-['Roboto'] leading-[25.20px]">
              Take a photo of the booked luggage and upload it.
            </div>
            <div className='w-[211px] h-[267px] bg-gray-200 rounded-tl-[30px] rounded-tr-[30px] rounded-bl-[30px] rounded-br-[80px]' />
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='w-[30px] h-[30px] bg-neutral-500 rounded-full flex-center text-white'>
            <span>3</span>
          </div>
          <div className='w-[257px] h-[421px] bg-white rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[110px] shadow-inner flex flex-col justify-around items-center'>
            <div className="w-[211px] h-14 text-black text-lg font-normal font-['Roboto'] leading-[25.20px]">
              Hand over your luggage to the staff at the designated location.
            </div>
            <div className='w-[211px] h-[267px] bg-gray-200 rounded-tl-[30px] rounded-tr-[30px] rounded-bl-[30px] rounded-br-[80px]' />
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='w-[30px] h-[30px] bg-neutral-500 rounded-full flex-center text-white'>
            <span>4</span>
          </div>
          <div className='w-[257px] h-[421px] bg-white rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[110px] shadow-inner flex flex-col justify-around items-center'>
            <div className="w-[211px] h-14 text-black text-lg font-normal font-['Roboto'] leading-[25.20px]">
              Retrieve the delivered luggage upon arrival at your destination.
            </div>
            <div className='w-[211px] h-[267px] bg-gray-200 rounded-tl-[30px] rounded-tr-[30px] rounded-bl-[30px] rounded-br-[80px]' />
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center mt-10'>
        <h1 className='text-blue-700 text-7xl font-medium'>Price</h1>
        <div className='text-zinc-800 text-2xl font-normal mt-16'>
          HanzFree can deliver not only luggage but also a wide variety of items at reasonable
          prices.
        </div>

        <table className='w-full mt-10 border border-stone-200 shadow-lg'>
          <thead className='h-12'>
            <tr className='bg-blue-700 text-white font-medium'>
              <th className='border-x'>Luggage Size</th>
              <th className='border-x'>Airport → Accommodation</th>
              <th className='border-x'>Accommodation → Airport</th>
              <th className='border-x'>Accommodation → Accommodation</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((rowData, index) => (
              <tr key={`table-${index}`} className='h-12'>
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
  );
};

export default Section4;
