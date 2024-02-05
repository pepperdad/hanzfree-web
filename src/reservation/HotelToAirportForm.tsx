import React from 'react';

import { FormInputProps } from './AirportToHotelForm';
import { AIRPORT_TERMINAL } from './constants';
import InputField from './InputField';
import TimeSelect from './TimeSelect';

const HotelToAirportForm = ({ register, errors }: FormInputProps) => {
  return (
    <>
      <InputField
        inputName='hotelName'
        label='Hotel Name'
        register={register}
        rules={{ required: 'please enter your hotel name' }}
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
