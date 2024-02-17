import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { getReservationCount } from '@pages/api/booking';
import { DELIVERY_TYPE } from '@reservation/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/components/shadcn/ui/avatar';
import { Button } from '@shared/components/shadcn/ui/button';
import { Label } from '@shared/components/shadcn/ui/label';
import { Skeleton } from '@shared/components/shadcn/ui/skeleton';
import { UserProfile } from '@shared/types';

interface ReservationCountType {
  airportToHotel: number;
  hotelToAirport: number;
  hotelToHotel: number;
}

interface ReservationMethodTypes {
  method: keyof typeof DELIVERY_TYPE;
}

const reservationMethod: ReservationMethodTypes[] = [
  { method: 'airportToHotel' },
  { method: 'hotelToAirport' },
  { method: 'hotelToHotel' },
];

const UserPage = ({ userData }: UserProfile) => {
  const router = useRouter();
  //   console.log('userData', userData);

  const [loading, setLoading] = useState(true);
  const [reservationCount, setReservationCount] = useState<ReservationCountType>();

  useEffect(() => {
    getReservationCount()
      .then((res) => {
        // console.log('res', res);
        setReservationCount(res.data);
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className='min-h-screen-280 flex items-center justify-center bg-gray-100 md:py-8'>
      <div className='max-w-screen-lg w-full min-h-screen-280 md:min-h-0 p-8 bg-white shadow-md md:rounded-3xl mx-0 md:mx-4'>
        {loading ? (
          <div className='flex flex-col items-center space-y-6'>
            <Skeleton className='h-10 w-3/5 rounded-xl' />
            <Skeleton className='h-[450px] w-11/12 rounded-xl flex flex-col items-center'>
              <Skeleton className='mt-2 h-24 w-24 rounded-full bg-slate-200' />
              <Skeleton className='mt-2 h-6 w-2/5 md:w-1/6 bg-slate-300' />
              <Skeleton className='my-2 h-4 w-3/5 md:w-1/5 bg-slate-200' />
              <Skeleton className='my-4 h-32 w-5/6 bg-slate-200' />
              <div className='flex gap-4'>
                <Skeleton className='my-4 h-10 w-32 bg-slate-300' />
                <Skeleton className='my-4 h-10 w-32 bg-slate-300' />
              </div>
            </Skeleton>
          </div>
        ) : (
          <>
            <h1 className='text-3xl font-bold text-center text-blue-700 mb-4'>
              {userData.firstName}&rsquo;s Profile
            </h1>

            <div className='flex flex-col items-center'>
              <Avatar className='w-24 h-24 shadow-md'>
                <AvatarImage src={userData.profileImg} alt='user-image' />
                <AvatarFallback>Image</AvatarFallback>
              </Avatar>

              <div className='text-2xl font-bold mt-2'>
                {userData.lastName} {userData.firstName}
              </div>

              <Label className='my-2'>{userData.email}</Label>

              <div className='shadow p-4 rounded-lg border my-2 md:mt-4'>
                <div className='flex justify-center mb-5'>
                  <Image
                    src='/assets/shared/booking-list.png'
                    alt='booking list'
                    width={28}
                    height={28}
                  />
                  <p className='ml-1 text-lg font-semibold text-blue-700'>Your booking records</p>
                </div>

                <div className='flex justify-between gap-4'>
                  {reservationMethod.map((data, i) => (
                    <div key={`count-${i}`} className='flex flex-col'>
                      <p className='font-semibold text-center'>{DELIVERY_TYPE[data.method]}</p>
                      <p className='text-center mt-1 font-semibold'>
                        {reservationCount?.[data.method] ?? 0}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className='flex justify-center w-full my-2 md:my-5 gap-4'>
                <Button
                  className='bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none'
                  onClick={() => {
                    router.push('/reservation');
                  }}
                >
                  Book a Service
                </Button>

                <Button
                  className='bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none'
                  onClick={() => {
                    router.push('/booking');
                  }}
                >
                  My Bookings
                </Button>
              </div>

              <Link href='/terms'>
                <Label className='my-2 underline underline-offset-2 cursor-pointer'>
                  Go to see term -&gt;
                </Label>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;
