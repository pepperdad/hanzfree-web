import { Dispatch, SetStateAction, createContext } from 'react';

export const ReservationPageContext = createContext<Dispatch<SetStateAction<number>>>(() => {});
