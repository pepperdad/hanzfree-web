import React from 'react';

import DetailColumn from '@shared/components/DetailColumn';

import { ContentProps } from './AirportToHotelContent';

const HotelToAirportContent = ({ reservation, detail = false }: ContentProps) => {
  if (!detail) {
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
      </>
    );
  }

  return (
    <>
      <DetailColumn
        label='Path'
        content={`${reservation.hotelAddress} -> Termianl ${reservation.airportTerminal}`}
      />
      <DetailColumn
        label='Luggage pick-up time'
        content={`${reservation.pickUpTimeHour} : ${reservation.pickUpTimeMin}`}
      />
      <DetailColumn label='Hotel Name' content={`${reservation.hotelName}`} />
      <DetailColumn label='Hotel Address' content={`${reservation.hotelAddress}`} />
      <DetailColumn
        label="Hotel Reservation representative's name"
        content={`${reservation.hotelRepresentativeName}`}
      />
      <DetailColumn label='Contact id:' content={`${reservation.contactId}`} />
    </>
  );
};

export default HotelToAirportContent;
