import React, { useContext, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { useRecoilState } from 'recoil';

import { useForm } from 'react-hook-form';

import intlTelInput from 'intl-tel-input';

import Instance from '@pages/api/config';
import { reservationState } from '@shared/recoil';
import { UserProfile } from '@shared/types';

import { AIRPORT_TERMINAL, TERMS } from './constants';
import ContactInfo from './ContactInfo';
import { ReservationPageContext } from './context';
import InputField from './InputField';
import SubmitForm from './SubmitForm';
import TermCheck from './TermCheck';
import TimeSelect from './TimeSelect';

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

      const res = await Instance.post('/reservation', formData);

      if (res.status === 201) {
        setReservation(formData);
        setPage(3);
      }
    } catch (e) {
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
        fetch('https://ipapi.co/json')
          .then((res) => res.json())
          .then((data) => callback(data.country_code))
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

  useEffect(() => {
    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
      document.body.style.overflow = 'visible';
    };

    if (isSubmitting) {
      disableScroll();
    } else {
      enableScroll();
    }

    // 컴포넌트가 언마운트 될 때 스크롤 허용
    return () => {
      enableScroll();
    };
  }, [isSubmitting]);

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
        <InputField
          inputName='hotelName'
          label='Hotel Name'
          register={register}
          rules={{ required: 'please enter your hotel name' }}
          // pattern: {
          //   value: /^[A-Za-z0-9._%+-]+@naver.com$/,
          //   message: 'Only naver.com emails allowed',
          // },
          // minLength: {
          //   message: 'The username should be longer than 5 chars.',
          //   value: 5,
          // },
          errors={errors}
        />

        <InputField
          inputName='hotelAddress'
          label='Hotel Address'
          register={register}
          rules={{ required: 'please enter your hotel address' }}
          errors={errors}
        />

        <InputField
          inputName='hotelRepresentativeName'
          label='Hotel Representative Name'
          register={register}
          rules={{ required: 'please enter your hotel representative name' }}
          errors={errors}
        />

        <InputField
          inputName='airportTerminal'
          label='Airport Terminal'
          register={register}
          type='select'
          options={AIRPORT_TERMINAL}
          rules={{ required: 'select one option' }}
          errors={errors}
        />

        <InputField
          inputName='flightNumber'
          label={`Flight Number${
            reservation?.method === 'airportToHotel'
              ? '(Arrival)'
              : reservation?.method === 'hotelToAirport'
                ? '(Departure)'
                : ''
          }`}
          register={register}
          rules={{ required: 'please enter your flight number' }}
          errors={errors}
        />

        <div className='w-1/2' />

        {reservation.method === 'airportToHotel' && (
          <>
            <TimeSelect
              label='Arrival time at airport'
              hourName='arrivalTimeHour'
              minuteName='arrivalTimeMin'
              register={register}
              errors={errors}
            />

            <TimeSelect
              label='Drop off luggage at the airport'
              hourName='dropOffTimeHour'
              minuteName='dropOffTimeMin'
              register={register}
              errors={errors}
            />
          </>
        )}
        {reservation.method === 'hotelToAirport' && (
          <>
            <TimeSelect
              label='Departure time at hotel'
              hourName='departureTimeHour'
              minuteName='departureTimeMin'
              register={register}
              errors={errors}
            />

            <TimeSelect
              label='Pick up luggage at the airport'
              hourName='pickUpTimeHour'
              minuteName='pickUpTimeMin'
              register={register}
              errors={errors}
            />
          </>
        )}

        <InputField
          inputName='contactId'
          label='WhatsApp/Line/WeChat/Kakao Talk'
          register={register}
          rules={{ required: 'please enter your contact id' }}
          placeholder='Enter app and Id (ex. WhatsApp +8210123456789)'
          errors={errors}
        />

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
          <span className='text-red-500'>
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
