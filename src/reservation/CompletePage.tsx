import React, { useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';

import AirportToHotelContent from '@booking/AirportToHotelContent';
import HotelToAirportContent from '@booking/HotelToAirportContent';
import HotelToHotelContent from '@booking/HotelToHotelContent';
import DetailColumn from '@shared/components/DetailColumn';
import { reservationState } from '@shared/recoil';
import { formatDate } from '@shared/util';

import { DELIVERY_TYPE } from './constants';

const Complete = dynamic(() => import('@shared/components/animation/celebrate'), { ssr: false });

const CompletePage = () => {
  const router = useRouter();
  const reservation = useRecoilValue(reservationState);

  // console.log('reservation', reservation);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    document.body.style.overflow = 'visible';
  }, []);

  return (
    <div className='py-8 md:py-12 min-h-280 mx-6'>
      <div className='flex-center flex-col text-center'>
        <div className='absolute top-0 left-0 flex-center w-screen h-64 z-10'>
          <Complete />
        </div>
        <div className='text-3xl md:text-5xl font-bold pb-4'>Thank you for your reservation!</div>
        <h3 className='pb-4 md:pb-8 text-center text-gray-500 text-sm md:text-base'>
          or any inquiries or assistance, feel free to contact us. Happy journey
        </h3>

        <div key={reservation.id} className='flex bg-white p-4 rounded-xl shadow-md md:w-3/5'>
          <div className='grow'>
            <p className='text-gray-800 md:text-xl font-semibold mb-4'>
              Booked date {formatDate(reservation.date as string)}
            </p>
            <div>
              <DetailColumn
                label='Name'
                content={`${reservation.firstName} ${reservation.lastName}`}
              />
              <DetailColumn label='Method' content={`${DELIVERY_TYPE[reservation.method]}`} />
              <DetailColumn label='Quantity' content={`${reservation.quantity}`} />

              {reservation.method === 'airportToHotel' ? (
                <AirportToHotelContent reservation={reservation} detail />
              ) : reservation.method === 'hotelToAirport' ? (
                <HotelToAirportContent reservation={reservation} detail />
              ) : reservation.method === 'hotelToHotel' ? (
                <HotelToHotelContent reservation={reservation} detail />
              ) : null}
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push('/booking')}
          className='p-4 mt-4 md:mt-8 rounded-xl hover:bg-slate-100 text-gray-900 text-sm md:text-base border border-gray-600 font-medium'
        >
          Go to My Bookings
        </button>
      </div>
    </div>
  );
};

export default CompletePage;
