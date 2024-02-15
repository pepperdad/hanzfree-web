import React from 'react';

import { ReservationData } from '@shared/types';

export interface ContentProps {
  reservation: ReservationData;
  detail?: boolean;
}

const AirportToHotelContent = ({ reservation, detail = false }: ContentProps) => {
  return (
    <>
      <p className='booking_detail_label'>
        Path:
        <span className='booking_detail_content'>
          Termianl {reservation.airportTerminal} -&gt; {reservation.hotelAddress}
        </span>
      </p>
      <p className='booking_detail_label'>
        Luggage drop-off time:
        <span className='booking_detail_content'>
          {reservation.dropOffTimeHour} : {reservation.dropOffTimeMin}
        </span>
      </p>
      {detail && (
        <>
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
            <span className='booking_detail_content'>{reservation.hotelRepresentativeName}</span>
          </p>
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
            <span className='booking_detail_content'>{reservation.hotelRepresentativeName}</span>
          </p>
        </>
      )}
    </>
  );
};

export default AirportToHotelContent;
