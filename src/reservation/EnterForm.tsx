import React, { useContext, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { useRecoilState } from 'recoil';

import { useForm } from 'react-hook-form';

import intlTelInput from 'intl-tel-input';

import Instance from '@pages/api/config';
import { reservationState } from '@shared/recoil';
import { UserProfile } from '@shared/types';

import AirportToHotelForm from './AirportToHotelForm';
import { TERMS } from './constants';
import ContactInfo from './ContactInfo';
import { ReservationPageContext } from './context';
import HotelToAirportForm from './HotelToAirportForm';
import HotelToHotelForm from './HotelToHotelForm';
import SubmitForm from './SubmitForm';
import TermCheck from './TermCheck';

const Loading = dynamic(() => import('@shared/components/animation/loading'), { ssr: false });

interface EnterFormProps {
  userData: UserProfile;
}

const EnterForm = ({ userData }: EnterFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'all' });

  const setPage = useContext(ReservationPageContext);
  const [reservation, setReservation] = useRecoilState(reservationState);
  const [country, setCountry] = useState<string>('');
  const [dialCode, setDialCode] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const onValid = async (data: any) => {
    if (isSubmitting) return;

    document.body.style.overflow = 'hidden';

    try {
      const formData = {
        ...data,
        country,
        dialCode,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        method: reservation.method,
        date: reservation.date,
        quantity: reservation.quantity,
        price: reservation.price,
      };

      // TODO: TEST
      setReservation(formData);
      setPage(3);

      // const res = await Instance.post('/reservation', formData);
      // console.log('res', res);

      // if (res.status === 201) {
      // setReservation(formData);
      //   setPage(3);
      // }
    } catch (e) {
      document.body.style.overflow = 'visible';

      console.log(e);
    }
  };

  useEffect(() => {
    const input = document.querySelector('#phoneNumber') as Element;

    const iti = intlTelInput(input, {
      initialCountry: 'auto',
      separateDialCode: true,
      autoPlaceholder: 'aggressive',
      geoIpLookup: (callback) => {
        fetch(`https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}`)
          .then((res) => res.json())
          .then((data) => callback(data.country))
          .catch(() => callback('us'));
      },
      utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js',
    });

    input.addEventListener('countrychange', () => {
      const { dialCode: itiDialCode, name } = iti.getSelectedCountryData();

      setDialCode(itiDialCode);
      setCountry(name);
    });
  }, []);

  return (
    <div className='md:w-4/5 mt-3'>
      {isSubmitting && (
        <div className='absolute bottom-0 left-0 z-10 flex-center w-screen h-screen opacity-80 bg-slate-50'>
          <Loading />
        </div>
      )}

      <form
        onSubmit={handleSubmit(onValid)}
        className='flex flex-col md:flex-row flex-wrap justify-between gap-y-2 md:gap-y-3'
      >
        {reservation.method === 'airportToHotel' ? (
          <AirportToHotelForm register={register} errors={errors} />
        ) : reservation.method === 'hotelToAirport' ? (
          <HotelToAirportForm register={register} errors={errors} />
        ) : (
          <HotelToHotelForm register={register} errors={errors} />
        )}

        <div className='flex flex-col md:w-1/2-20'>
          <label htmlFor='phoneNumber' className='mb-1'>
            Phone Number
          </label>
          <input
            id='phoneNumber'
            type='tel'
            className={`input w-full ${
              errors?.phoneNumber ? 'border border-red-500' : 'border-gray-300'
            } `}
            {...register('phoneNumber', {
              required: 'please enter your phone number',
            })}
            placeholder='E.g +852 1234 5678'
            onChange={(e) => setPhone(e.target.value)}
          />
          <span className='text-red-500 text-sm'>
            {errors?.phoneNumber?.message && `⚠ ${String(errors?.phoneNumber?.message)}`}
          </span>
        </div>

        {TERMS.map((term, index) => (
          <TermCheck
            key={index}
            inputName={`term${index + 1}`}
            rules={{ required: 'Please agree to the terms and conditions' }}
            content={term.content}
            register={register}
            errors={errors}
          />
        ))}

        <ContactInfo userData={userData} dialCode={dialCode} phone={phone} />

        <SubmitForm />
      </form>
    </div>
  );
};

export default EnterForm;
