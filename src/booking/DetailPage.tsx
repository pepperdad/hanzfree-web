import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { getReservation } from '@pages/api/booking';
import { formatDate } from '@shared/util';

const Loading = dynamic(() => import('@shared/components/animation/loading'), { ssr: false });

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [reservation, setReservation] = useState<any>();

  useEffect(() => {
    getReservation(id as string)
      .then((res) => {
        console.log('res', res);
        setReservation(res.data);
      })
      .catch((error) => {
        console.error('Error fetching reservation list:', error);
      });
  }, [id]);

  return (
    <div className='min-h-screen-230 flex items-center justify-center bg-gray-100'>
      <div className='max-w-screen-lg w-full min-h-screen-230 md:min-h-0 p-8 bg-white shadow-md md:rounded-3xl'>
        <div className='flex justify-between gap-3 mb-6 items-center'>
          <h1 className='text-xl md:text-3xl font-semibold text-blue-500'>
            Reservation details for {formatDate(reservation?.date)}
          </h1>
          <button
            onClick={() => router.push('/booking')}
            className='p-2 md:p-4 bg-slate-100 rounded-md hover:bg-slate-200 text-blue-500'
          >
            Back to My Bookings
          </button>
        </div>

        {!reservation ? (
          <div className='flex-center'>
            <Loading />
          </div>
        ) : (
          <div key={reservation.id} className='flex p-4 border rounded-xl'>
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
                    Path: Termianl {reservation.airportTerminal} -&gt; {reservation.hotelAddress}
                  </p>
                  <p className='text-gray-500'>
                    Luggage drop-off time: {reservation.dropOffTimeHour} :{' '}
                    {reservation.dropOffTimeMin}
                  </p>
                </>
              ) : reservation.method === 'hotelToAirport' ? (
                <>
                  <p className='text-gray-500'>
                    Path: {reservation.hotelAddress} -&gt; Termianl {reservation.airportTerminal}
                  </p>
                  <p className='text-gray-500'>
                    Luggage pick-up time: {reservation.pickUpTimeHour} : {reservation.pickUpTimeMin}
                  </p>
                </>
              ) : null}

              <p className='text-gray-500'>Hotel Name: {reservation.hotelName}</p>
              <p className='text-gray-500'>Hotel Address: {reservation.hotelAddress}</p>
              <p className='text-gray-500'>
                Hotel Reservation representative&apos;s name: {reservation.hotelRepresentativeName}
              </p>

              <p className='mt-2 text-black font-medium'>Total paid: {reservation.price}</p>
              <p className='text-gray-500 font-medium'>
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
