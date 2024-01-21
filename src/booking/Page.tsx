import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { getReservationList } from '@pages/api/booking';
import { formatDate } from '@shared/util';

const Loading = dynamic(() => import('@shared/components/animation/loading'), { ssr: false });

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [reservationList, setReservationList] = useState<any>([]);

  useEffect(() => {
    getReservationList()
      .then((res) => {
        console.log('res', res);
        setReservationList(res.data);
      })
      .catch((error) => {
        console.error('Error fetching reservation list:', error);
      })
      .finally(() => {
        setLoading(false); // 데이터 fetching이 완료되면 로딩 상태를 false로 변경
      });
  }, []);

  return (
    <div className='min-h-screen-230 flex items-center justify-center bg-gray-100 md:py-10'>
      <div className='max-w-screen-lg w-full min-h-screen-230 md:min-h-0 p-8 bg-white shadow-md md:rounded-3xl'>
        <div className='flex items-end mb-6'>
          <h1 className='text-3xl font-semibold text-blue-500'>My Bookings</h1>
          <span className='ml-2 text-gray-500'>({reservationList.length} records)</span>
        </div>

        {loading ? (
          <div className='flex-center'>
            <Loading />
          </div>
        ) : reservationList?.length === 0 ? (
          <p className='text-gray-500'>No Bookings available.</p>
        ) : (
          <div className='grid gap-4'>
            {reservationList?.map((reservation: any) => (
              <div key={reservation.id} className='flex p-4 border rounded-xl hover:shadow-md'>
                <div className='grow'>
                  <p className='text-lg font-semibold'>Booked on {formatDate(reservation.date)}</p>
                  <p className='text-gray-500'>
                    Name: {reservation.firstName} {reservation.lastName}
                  </p>
                  <p className='text-gray-500'>Method: {reservation.method}</p>
                  <p className='text-gray-500'>Quantity: {reservation.quantity}</p>
                  {reservation.method === 'airportToHotel' ? (
                    <>
                      <p className='text-gray-500'>
                        Path: Termianl {reservation.airportTerminal} -&gt;{' '}
                        {reservation.hotelAddress}
                      </p>
                      <p className='text-gray-500'>
                        Luggage drop-off time: {reservation.dropOffTimeHour} :{' '}
                        {reservation.dropOffTimeMin}
                      </p>
                    </>
                  ) : reservation.method === 'hotelToAirport' ? (
                    <>
                      <p className='text-gray-500'>
                        Path: {reservation.hotelAddress} -&gt; Termianl{' '}
                        {reservation.airportTerminal}
                      </p>
                      <p className='text-gray-500'>
                        Luggage pick-up time: {reservation.pickUpTimeHour} :{' '}
                        {reservation.pickUpTimeMin}
                      </p>
                    </>
                  ) : null}

                  <p className='mt-2 text-black font-medium'>Total paid: {reservation.price}</p>
                  <p className='text-gray-500 font-medium'>
                    Created at {formatDate(reservation.createdAt)}
                  </p>
                </div>

                {/* Link to the reservation detail page */}

                <Link href={`/booking/${reservation.id}`}>
                  <button className='my-auto p-4 bg-slate-100 rounded-md hover:bg-slate-200 shrink-0'>
                    <a className='text-blue-500'>View Details</a>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
