import { DELIVERY_TYPE } from '@reservation/constants';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
}

export interface PagePropsWithSetPage {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface UserProfileData {
  id: number;
  email: string;
  firstName: string;
  isSocialAccountRegistered: boolean;
  lastName: string;
  phoneNumber: string;
  profileImg: string;
  role: string;
  socialProvider: string;
  country: string | null;
  countryCode: string | null;
  createdAt: string;
  currentRefreshToken: string;
  currentRefreshTokenExp: string;
  dialCode: string;
  externalId: null;
}

export interface UserProfile {
  userData: UserProfileData;
}

export interface PageState {
  page: number;
}

export type DatePiece = Date | null;

export type DateType = DatePiece | [DatePiece, DatePiece];

export interface ReservationData {
  id: number;
  method: keyof typeof DELIVERY_TYPE;
  date: Date | null | string;
  quantity: number;
  price: number;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  hotelName: string;
  hotelAddress: string;
  hotelRepresentativeName: string;
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

  arrivalHotelName: string;
  arrivalHotelAddress: string;

  contactId: string;
  dialCode: string;
  phoneNumber: string;

  createdAt: string;
}
