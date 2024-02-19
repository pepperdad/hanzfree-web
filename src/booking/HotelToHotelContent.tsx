import React from 'react';

import DetailColumn from '@shared/components/DetailColumn';

import { ContentProps } from './AirportToHotelContent';

const HotelToHotelContent = ({ reservation, detail = false }: ContentProps) => {
  if (!detail) {
    return (
      <>
        <p className='booking_detail_label'>
          Path:
          <span className='booking_detail_content'>
            {reservation.hotelAddress} -&gt; {reservation.arrivalHotelAddress}
          </span>
        </p>
        <p className='booking_detail_label'>
          Your departure time at hotel:
          <span className='booking_detail_content'>
            {reservation.departureTimeHour} : {reservation.departureTimeMin}
          </span>
        </p>
      </>
    );
  }

  return (
    <>
      <DetailColumn
        label='Path'
        content={`${reservation.hotelAddress} -> ${reservation.arrivalHotelAddress}`}
      />
      <DetailColumn
        label='Your departure time at hotel'
        content={`${reservation.departureTimeHour} : ${reservation.departureTimeMin}`}
      />
      <DetailColumn label='Hotel Name' content={`${reservation.hotelName}`} />
      <DetailColumn label='Hotel Address' content={`${reservation.hotelAddress}`} />
      <DetailColumn label='Drop-off Hotel Name' content={`${reservation.arrivalHotelName}`} />
      <DetailColumn label='Drop-off Hotel Address' content={`${reservation.arrivalHotelAddress}`} />
      <DetailColumn label='Contact id:' content={`${reservation.contactId}`} />
    </>
  );
};

export default HotelToHotelContent;
