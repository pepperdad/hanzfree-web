import React from 'react';

import { ContentProps } from './AirportToHotelContent';

const HotelToAirportContent = ({ reservation, detail = false }: ContentProps) => {
  return (
    <>
      <p className='booking_detail_label'>
        Path:
        <span className='booking_detail_content'>
          {reservation.hotelAddress} -&gt; Termianl {reservation.airportTerminal}
        </span>
      </p>
      <p className='booking_detail_label'>
        Luggage pick-up time:
        <span className='booking_detail_content'>
          {reservation.pickUpTimeHour} : {reservation.pickUpTimeMin}
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

export default HotelToAirportContent;
