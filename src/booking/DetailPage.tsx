import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { getReservation } from '@pages/api/booking';
import { DELIVERY_TYPE } from '@reservation/constants';
import DetailColumn from '@shared/components/DetailColumn';
import { Skeleton } from '@shared/components/shadcn/ui/skeleton';
import { ReservationData } from '@shared/types';
import { formatDate } from '@shared/util';

import AirportToHotelContent from './AirportToHotelContent';
import HotelToAirportContent from './HotelToAirportContent';
import HotelToHotelContent from './HotelToHotelContent';

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [reservation, setReservation] = useState<ReservationData>();

  useEffect(() => {
    getReservation(id as string)
      .then((res) => {
        // console.log('res', res);
        setReservation(res.data);
      })
      .catch((error) => {
        console.error('Error fetching reservation list:', error);
      });
  }, [id]);

  return (
    <div className='min-h-screen-230 flex items-center justify-center bg-gray-100 md:py-8'>
      <div className='max-w-screen-lg w-full min-h-screen-230 md:min-h-0 p-8  md:rounded-3xl'>
        <div className='flex justify-between gap-3 mb-4 md:mb-6 items-center shadow-md bg-white p-4 rounded-xl'>
          <div>
            <p className='text-lg md:text-2xl text-green-500 font-semibold'>Booking completed</p>
            <p className='my-3 text-xl text-black font-medium'>
              Total paid: ₩{reservation?.price.toLocaleString()}
            </p>
            <button
              onClick={() => router.push('/reservation')}
              className='p-2 md:px-3 md:py-2 rounded-2xl hover:bg-slate-100 text-gray-900 text-sm md:text-base border border-gray-600 font-medium'
            >
              Book again
            </button>
            <button
              onClick={() => router.push('/booking')}
              className='inline md:hidden ml-3 p-2 md:px-3 md:py-2 rounded-2xl hover:bg-slate-100 text-gray-900 text-sm md:text-base border border-gray-600 font-medium'
            >
              Back to My Bookings
            </button>
          </div>
          <button
            onClick={() => router.push('/booking')}
            className='hidden md:block p-2 md:px-3 md:py-2 rounded-2xl hover:bg-slate-100 text-gray-900 text-sm md:text-base border border-black font-medium'
          >
            Back to My Bookings
          </button>
        </div>

        {!reservation ? (
          <div className='flex flex-col space-y-3 bg-white p-4 rounded-xl'>
            <Skeleton className='h-8 md:h-10 w-56 md:w-[400px] rounded-xl mb-4 ' />
            <div className='space-y-3'>
              <Skeleton className='h-6 w-64 md:w-[550px]' />
              <Skeleton className='h-6 w-72 md:w-[500px]' />
              <Skeleton className='h-6 w-52 md:w-[500px]' />
              <Skeleton className='h-6 w-64 md:w-[550px]' />
              <Skeleton className='h-6 w-72 md:w-[500px]' />
              <Skeleton className='h-6 w-52 md:w-[500px]' />
              <Skeleton className='h-6 w-64 md:w-[550px]' />
              <Skeleton className='h-6 w-72 md:w-[500px]' />
              <Skeleton className='h-6 w-52 md:w-[500px]' />
              <Skeleton className='h-6 w-64 md:w-[550px]' />
              <Skeleton className='h-6 w-72 md:w-[500px]' />
              <Skeleton className='h-6 w-52 md:w-[500px]' />
            </div>
          </div>
        ) : (
          <div key={reservation.id} className='flex bg-white p-4 rounded-xl shadow-md'>
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

              <p className='font-medium text-gray-500 mt-8'>
                Created at {formatDate(reservation.createdAt)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
