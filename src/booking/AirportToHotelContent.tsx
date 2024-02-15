import React from 'react';

import DetailColumn from '@shared/components/DetailColumn';
import { ReservationData } from '@shared/types';

export interface ContentProps {
  reservation: ReservationData;
  detail?: boolean;
}

const AirportToHotelContent = ({ reservation, detail = false }: ContentProps) => {
  if (!detail) {
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
      </>
    );
  }

  return (
    <>
      <DetailColumn
        label='Path'
        content={`Termianl ${reservation.airportTerminal} -> ${reservation.hotelAddress}`}
      />
      <DetailColumn
        label='Luggage drop-off time'
        content={`${reservation.dropOffTimeHour} : ${reservation.dropOffTimeMin}`}
      />
      <DetailColumn label='Hotel Name' content={`${reservation.hotelName}`} />
      <DetailColumn label='Hotel Address' content={`${reservation.hotelAddress}`} />
      <DetailColumn
        label="Hotel Reservation representative's name:"
        content={`${reservation.hotelRepresentativeName}`}
      />
      <DetailColumn label='Contact id:' content={`${reservation.contactId}`} />
    </>
  );
};

export default AirportToHotelContent;
