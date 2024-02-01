import { atom } from 'recoil';

import { uniqueId } from 'lodash';

import { DELIVERY_TYPE } from '@reservation/constants';

interface ReservationState {
  method: keyof typeof DELIVERY_TYPE;
  date: Date | null;
  quantity: number;
  price: number;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  hotelName: string;
  hotelAddress: string;
  repersenativeName: string;
  airportTerminal: string;
  flightNumber: string;

  arrivalTimeHour: string;
  arrivalTimeMin: string;
  dropOffTimeHour: string;
  dropOffTimeMin: string;

  departureTimeHour: string;
  departureTimeMin: string;
  pickUpTimeHour: string;
  pickUpTimeMin: string;

  contactId: string;
  dialCode: string;
  phoneNumber: string;
}

export const reservationState = atom<ReservationState>({
  key: `reservationState/${uniqueId}`, // 각 atom의 고유한 키
  default: {
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
    repersenativeName: '',
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

    contactId: '',
    dialCode: '',
    phoneNumber: '',
  },
});
