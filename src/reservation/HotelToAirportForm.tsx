import React from 'react';

import LocationInput from '@shared/components/LocationInput';

import { AIRPORT_TERMINAL } from './constants';
import { FormInputProps } from './HotelToHotelForm';
import InputField from './InputField';
import TimeSelect from './TimeSelect';

const HotelToAirportForm = ({ location, setLocation, register, errors }: FormInputProps) => {
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

      <InputField
        width='md:w-1/2-20'
        inputName='hotelRepresentativeName'
        label='Hotel Representative Name'
        register={register}
        rules={{ required: 'please enter your hotel representative name' }}
        errors={errors}
      />

      <InputField
        width='md:w-1/2-20'
        inputName='airportTerminal'
        label='Airport Terminal'
        register={register}
        type='select'
        options={AIRPORT_TERMINAL}
        rules={{ required: 'select one option' }}
        errors={errors}
      />

      <InputField
        width='md:w-1/2-20'
        inputName='flightNumber'
        label='Flight Number(Departure)'
        register={register}
        rules={{ required: 'please enter your flight number' }}
        errors={errors}
      />

      <div className='w-1/2-20' />

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

      <InputField
        width='md:w-1/2-20'
        inputName='contactId'
        label='WhatsApp/Line/WeChat/Kakao Talk'
        register={register}
        rules={{ required: 'please enter your contact id' }}
        placeholder='Enter app and Id (ex. WhatsApp - davidleestevenson)'
        errors={errors}
      />
    </>
  );
};

export default HotelToAirportForm;
