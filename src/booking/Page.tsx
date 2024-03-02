import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { getReservationList } from '@pages/api/booking';
import { DELIVERY_TYPE } from '@reservation/constants';
import { Skeleton } from '@shared/components/shadcn/ui/skeleton';
import { ReservationData } from '@shared/types';
import { formatDate } from '@shared/util';

import AirportToHotelContent from './AirportToHotelContent';
import HotelToAirportContent from './HotelToAirportContent';
import HotelToHotelContent from './HotelToHotelContent';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [reservationList, setReservationList] = useState<ReservationData[]>([]);

  useEffect(() => {
    getReservationList()
      .then((res) => {
        setReservationList(res.data);
        // console.log('res.data', res.data);
      })
      .catch((error) => {
        console.error('Error fetching reservation list:', error);
      })
      .finally(() => {
        setLoading(false); // 데이터 fetching이 완료되면 로딩 상태를 false로 변경
      });
  }, []);

  return (
    <div className='min-h-screen-264 flex items-center justify-center bg-gray-100 md:py-8'>
      <div className='max-w-screen-lg w-full min-h-screen-264 md:min-h-0 p-8 bg-white shadow-md md:rounded-3xl mx-0 md:mx-4'>
        <div className='flex items-end mb-6'>
          <h1 className='text-lg md:text-3xl font-semibold text-blue-700'>My Bookings</h1>
          <span className='text-sm md:text-base ml-2 text-gray-500'>
            ({reservationList.length} records)
          </span>
        </div>

        {loading ? (
          <div className='flex flex-col space-y-6'>
            <Skeleton className='h-24 md:h-32 w-full rounded-xl' />
            <Skeleton className='h-24 md:h-32 w-full rounded-xl' />
            <Skeleton className='h-24 md:h-32 w-full rounded-xl' />
            <Skeleton className='h-24 md:h-0 w-full rounded-xl' />
          </div>
        ) : reservationList?.length === 0 ? (
          <p className='text-gray-500'>No Bookings available.</p>
        ) : (
          <div className='grid gap-6'>
            {reservationList?.map((reservation: ReservationData) => (
              <Link key={reservation.id} href={`/booking/${reservation.bookingNumber}`}>
                <div className='flex pl-3 pr-4 py-4 border rounded-xl shadow-md hover:shadow-lg'>
                  <div className='relative w-7 h-7 mr-2'>
                    <Image src='/assets/landing/logo_small.svg' alt='section1' layout='fill' />
                  </div>
                  <div className='grow'>
                    <p className='md:text-lg font-semibold mb-3'>
                      Booked on {formatDate(reservation.date as string)}
                    </p>
                    <p className='booking_detail_label'>
                      Method:
                      <span className='booking_detail_content'>
                        {DELIVERY_TYPE[reservation.method]}
                      </span>
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

                    <p className='mt-2 mb-1 text-black font-medium'>
                      Total paid: ₩ {reservation.price.toLocaleString()}
                    </p>
                    <p className='text-green-500 font-medium'>Booking completed</p>
                  </div>

                  <div className='hidden md:flex items-center gap-2'>
                    {reservation.method === 'airportToHotel' ? (
                      <>
                        <Image
                          src='/assets/reservation/airplane.svg'
                          alt='airplane'
                          width={70}
                          height={70}
                        />
                        <Image
                          src='/assets/reservation/right_arrow.svg'
                          alt='right_arrow'
                          width={25}
                          height={25}
                        />
                        <Image
                          src='/assets/reservation/home.svg'
                          alt='home'
                          width={70}
                          height={70}
                        />
                      </>
                    ) : reservation.method === 'hotelToAirport' ? (
                      <>
                        <Image
                          src='/assets/reservation/home.svg'
                          alt='home'
                          width={70}
                          height={70}
                        />
                        <Image
                          src='/assets/reservation/right_arrow.svg'
                          alt='right_arrow'
                          width={25}
                          height={25}
                        />
                        <Image
                          src='/assets/reservation/airplane.svg'
                          alt='airplane'
                          width={70}
                          height={70}
                        />
                      </>
                    ) : reservation.method === 'hotelToHotel' ? (
                      <>
                        <Image
                          src='/assets/reservation/home.svg'
                          alt='home'
                          width={70}
                          height={70}
                        />
                        <Image
                          src='/assets/reservation/right_arrow.svg'
                          alt='right_arrow'
                          width={25}
                          height={25}
                        />
                        <Image
                          src='/assets/reservation/home.svg'
                          alt='home'
                          width={70}
                          height={70}
                        />
                      </>
                    ) : null}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
