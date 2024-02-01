import React, { useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';

import { reservationState } from '@shared/recoil';

import { DELIVERY_TYPE } from './constants';

const Complete = dynamic(() => import('@shared/components/animation/celebrate'), { ssr: false });

const CompletePage = () => {
  const router = useRouter();
  const reservation = useRecoilValue(reservationState);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className='py-12 min-h-screen-230'>
      <div className='flex-center flex-col text-center'>
        <div className='absolute top-0 left-0 flex-center w-screen h-screen -z-10'>
          <Complete />
        </div>
        <div className='text-4xl md:text-5xl font-bold pb-4'>Thank you for your reservation!</div>
        <h2 className='pb-8 text-center text-gray-500'>
          or any inquiries or assistance, feel free to contact us. Happy journey
        </h2>

        <div className='rounded-2xl border border-zinc-500 p-4 mx-4 md:w-3/5'>
          <div className='flex py-2'>
            <div className='text-neutral-600 text-xl w-1/2'>Date</div>
            <div className='text-neutral-600 text-xl font-semibold grow'>
              {reservation.date && reservation.date.toLocaleDateString()}{' '}
              {reservation.method === 'airportToHotel' &&
                `${reservation.dropOffTimeHour} : ${reservation.dropOffTimeMin}`}
              {reservation.method === 'hotelToAirport' &&
                `${reservation.pickUpTimeHour} : ${reservation.pickUpTimeMin}`}
            </div>
          </div>

          <div className='flex py-2'>
            <div className='text-neutral-600 text-xl w-1/2'>Terminal</div>
            <div className='text-neutral-600 text-xl font-semibold grow'>
              Terminal {reservation.airportTerminal}
            </div>
          </div>

          <div className='flex py-2'>
            <div className='text-neutral-600 text-xl w-1/2'>Method</div>
            <div className='text-neutral-600 text-xl font-semibold grow'>
              {DELIVERY_TYPE[reservation.method]}
            </div>
          </div>

          <div className='flex py-2'>
            <div className='text-neutral-600 text-xl w-1/2'>Name</div>
            <div className='text-neutral-600 text-xl font-semibold grow'>
              {reservation.firstName} {reservation.lastName}
            </div>
          </div>

          <div className='flex py-2'>
            <div className='text-neutral-600 text-xl w-1/2'>Hotel Name</div>
            <div className='text-neutral-600 text-xl font-semibold grow'>
              {reservation.hotelName}
            </div>
          </div>

          <div className='flex py-2'>
            <div className='text-neutral-600 text-xl w-1/2'>Hotel Address</div>
            <div className='text-neutral-600 text-xl font-semibold grow'>
              {reservation.hotelAddress}
            </div>
          </div>

          <div className='flex py-2'>
            <div className='text-neutral-600 text-xl w-1/2'>Phone Number</div>
            <div className='text-neutral-600 text-xl font-semibold grow'>
              {reservation.dialCode}-{reservation.phoneNumber}
            </div>
          </div>

          <div className='flex py-2'>
            <div className='text-neutral-600 text-xl w-1/2'>Email(for updates your booking)</div>
            <div className='text-neutral-600 text-xl font-semibold grow'>{reservation.email}</div>
          </div>
        </div>

        <button
          onClick={() => router.push('/booking')}
          className='p-4 mt-4 bg-slate-100 rounded-md hover:bg-slate-200 text-blue-500'
        >
          Go to My Bookings
        </button>
      </div>
    </div>
  );
};

export default CompletePage;
