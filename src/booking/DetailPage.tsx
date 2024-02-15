import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { getReservation } from '@pages/api/booking';
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
      <div className='max-w-screen-lg w-full min-h-screen-230 md:min-h-0 p-8 bg-white shadow-md md:rounded-3xl'>
        <div className='flex justify-between gap-3 mb-6 items-center'>
          <h1 className='text-lg md:text-2xl font-semibold text-blue-500'>
            Booked date <br className='md:hidden' />
            {reservation && formatDate(reservation?.date as string)}
          </h1>
          <button
            onClick={() => router.push('/booking')}
            className='p-2 md:p-4 bg-slate-100 rounded-md hover:bg-slate-200 text-blue-500 text-sm md:text-base'
          >
            Back to My Bookings
          </button>
        </div>

        {!reservation ? (
          <div className='flex flex-col space-y-3'>
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
          <div key={reservation.id} className='flex p-4 border rounded-xl'>
            <div className='grow'>
              <p className='text-lg md:text-2xl text-green-500 font-semibold mb-1'>
                Booking completed
              </p>
              <p className='md:text-xl font-semibold mb-2'>
                Booked date {formatDate(reservation.date as string)}
              </p>
              <p className='booking_detail_label'>
                Name:
                <span className='booking_detail_content'>
                  {reservation.firstName} {reservation.lastName}
                </span>
              </p>
              <p className='booking_detail_label'>
                Method:
                <span className='booking_detail_content'>{reservation.method}</span>
              </p>
              <p className='booking_detail_label'>
                Quantity:
                <span className='booking_detail_content'>{reservation.quantity}</span>
              </p>
              {reservation.method === 'airportToHotel' ? (
                <AirportToHotelContent reservation={reservation} />
              ) : reservation.method === 'hotelToAirport' ? (
                <HotelToAirportContent reservation={reservation} />
              ) : reservation.method === 'hotelToHotel' ? (
                <HotelToHotelContent reservation={reservation} />
              ) : null}

              <p className='booking_detail_label'>
                Hotel Name:
                <span className='booking_detail_content'>{reservation.hotelName}</span>
              </p>
              <p className='booking_detail_label'>
                Hotel Address:
                <span className='booking_detail_content'>{reservation.hotelAddress}</span>
              </p>
              <p className='booking_detail_label'>
                Hotel Reservation representative&apos;s name:
                <span className='booking_detail_content'>
                  {reservation.hotelRepresentativeName}
                </span>
              </p>

              <p className='mt-2 text-xl text-black font-medium'>
                Total paid: ₩{reservation.price.toLocaleString()}
              </p>
              <p className='booking_detail_label font-medium'>
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
