import React from 'react';

import { FormInputProps } from './AirportToHotelForm';
import InputField from './InputField';
import TimeSelect from './TimeSelect';

const HotelToHotelForm = ({ register, errors }: FormInputProps) => {
  return (
    <>
      <InputField
        width='md:w-1/2-20'
        inputName='hotelName'
        label='Luggage Pick Up Hotel Name and representative name'
        register={register}
        rules={{ required: 'please enter your hotel name' }}
        errors={errors}
      />

      <InputField
        width='md:w-1/2-20'
        inputName='hotelAddress'
        label='Luggage Pick Up Hotel Address'
        register={register}
        rules={{ required: 'please enter your hotel address' }}
        errors={errors}
      />

      <InputField
        width='md:w-1/2-20'
        inputName='arrivalHotelName'
        label='Luggage Drop-off Hotel Name and representative name'
        register={register}
        rules={{ required: 'please enter your hotel name' }}
        errors={errors}
      />

      <InputField
        width='md:w-1/2-20'
        inputName='arrivalHotelAddress'
        label='Luggage Drop-off Hotel Address'
        register={register}
        rules={{ required: 'please enter your hotel address' }}
        errors={errors}
      />

      <TimeSelect
        label='Your departure time at hotel'
        hourName='departureTimeHour'
        minuteName='departureTimeMin'
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

export default HotelToHotelForm;
