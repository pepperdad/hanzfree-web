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
  country: string | null;
  countryCode: string | null;
  createdAt: string;
  currentRefreshToken: string;
  currentRefreshTokenExp: string;
  dialCode: string;
  email: string;
  externalId: null;
  firstName: string;
  isSocialAccountRegistered: boolean;
  lastName: string;
  phoneNumber: string;
  role: string;
  socialProvider: string;
}

export interface UserProfile {
  userData: UserProfileData;
}

export interface PageState {
  page: number;
}

export type DatePiece = Date | null;

export type DateType = DatePiece | [DatePiece, DatePiece];
