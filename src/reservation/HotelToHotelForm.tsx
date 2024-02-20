import React from 'react';

import { UseFormReturn } from 'react-hook-form';

import LocationInput from '@shared/components/LocationInput';

import InputField from './InputField';
import TimeSelect from './TimeSelect';

export interface FormInputProps {
  location?: any;
  setLocation?: React.Dispatch<React.SetStateAction<any>>;
  arrivalLocation?: any;
  setArrivalLocation?: React.Dispatch<React.SetStateAction<any>>;
  register: UseFormReturn['register'];
  errors: UseFormReturn['formState']['errors'];
}

const HotelToHotelForm = ({
  location,
  setLocation,
  arrivalLocation,
  setArrivalLocation,
  register,
  errors,
}: FormInputProps) => {
  return (
    <>
      <LocationInput
        label='Luggage Pick Up Hotel Name and representative name'
        addressLabel='Luggage Pick Up Hotel Address'
        name='hotelName'
        address='hotelAddress'
        location={location}
        setLocation={setLocation}
        register={register}
        rules={{ required: 'please enter your hotel address' }}
        errors={errors}
      />

      <LocationInput
        arrivalLocation
        label='Luggage Drop-off Hotel Name and representative name'
        addressLabel='Luggage Drop-off Hotel Address'
        name='arrivalHotelName'
        address='arrivalHotelAddress'
        location={arrivalLocation}
        setLocation={setArrivalLocation}
        register={register}
        rules={{ required: 'please enter your hotel address' }}
        errors={errors}
      />

      {/* <InputField
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
      /> */}

      {/* <InputField
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
      /> */}

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
