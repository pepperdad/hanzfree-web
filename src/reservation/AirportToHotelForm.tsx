import React from 'react';

import LocationInput from '@shared/components/LocationInput';

import { AIRPORT_TERMINAL } from './constants';
import { FormInputProps } from './HotelToHotelForm';
import InputField from './InputField';
import TimeSelect from './TimeSelect';

const AirportToHotelForm = ({ location, setLocation, register, errors }: FormInputProps) => {
  return (
    <>
      <LocationInput
        label='Hotel Name'
        addressLabel='Hotel Address'
        name='hotelName'
        address='hotelAddress'
        location={location}
        setLocation={setLocation}
        register={register}
        rules={{ required: 'please enter your hotel address' }}
        errors={errors}
      />
      {/* <InputField
        inputName='hotelName'
        width='md:w-1/2-20'
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
      /> */}

      <InputField
        inputName='hotelRepresentativeName'
        width='md:w-1/2-20'
        label='Hotel Representative Name'
        register={register}
        rules={{ required: 'please enter your hotel representative name' }}
        errors={errors}
      />

      <InputField
        inputName='airportTerminal'
        width='md:w-1/2-20'
        label='Airport Terminal'
        register={register}
        type='select'
        options={AIRPORT_TERMINAL}
        rules={{ required: 'select one option' }}
        errors={errors}
      />

      <InputField
        inputName='flightNumber'
        width='md:w-1/2-20'
        label='Flight Number(Arrival)'
        register={register}
        rules={{ required: 'please enter your flight number' }}
        errors={errors}
      />

      <div className='w-1/2-20' />

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

      <InputField
        inputName='contactId'
        width='md:w-1/2-20'
        label='WhatsApp/Line/WeChat/Kakao Talk'
        register={register}
        rules={{ required: 'please enter your contact id' }}
        placeholder='Enter app and Id (ex. WhatsApp - davidleestevenson)'
        errors={errors}
      />
    </>
  );
};

export default AirportToHotelForm;
