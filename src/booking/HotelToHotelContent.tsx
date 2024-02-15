import React from 'react';

import { ContentProps } from './AirportToHotelContent';

const HotelToHotelContent = ({ reservation, detail = false }: ContentProps) => {
  return (
    <>
      <p className='booking_detail_label'>
        Path:
        <span className='booking_detail_content'>
          {reservation.hotelAddress} -&gt; {reservation.arrivalHotelAddress}
        </span>
      </p>
      <p className='booking_detail_label'>
        Your departure time:
        <span className='booking_detail_content'>
          {reservation.departureTimeHour} : {reservation.departureTimeMin}
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
            Drop-off Hotel Name:
            <span className='booking_detail_content'>{reservation.arrivalHotelName}</span>
          </p>
          <p className='booking_detail_label'>
            Drop-off Hotel Address:
            <span className='booking_detail_content'>{reservation.arrivalHotelAddress}</span>
          </p>
        </>
      )}
    </>
  );
};

export default HotelToHotelContent;
