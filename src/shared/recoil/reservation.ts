import { atom } from 'recoil';

import { uniqueId } from 'lodash';

import { ReservationData } from '@shared/types';

export const reservationState = atom<ReservationData>({
  key: `reservationState/${uniqueId}`, // 각 atom의 고유한 키
  default: {
    id: 1,
    bookingNumber: '',
    method: 'airportToHotel',
    date: null,
    quantity: 1,
    price: 0,
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    hotelName: '',
    hotelAddress: '',
    hotelRepresentativeName: '',
    airportTerminal: '',
    flightNumber: '',

    arrivalTimeHour: '',
    arrivalTimeMin: '',
    dropOffTimeHour: '',
    dropOffTimeMin: '',

    departureTimeHour: '',
    departureTimeMin: '',
    pickUpTimeHour: '',
    pickUpTimeMin: '',

    arrivalHotelName: '',
    arrivalHotelAddress: '',

    contactId: '',
    dialCode: '',
    phoneNumber: '',

    createdAt: '',
  },
});
