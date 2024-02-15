import React from 'react';

import InputField from './InputField';

const TimeSelect = ({ label, hourName, minuteName, register, errors }: any) => {
  return (
    <div className='flex flex-col md:w-1/2-20'>
      <label htmlFor={label} className='mb-1'>
        {label}
      </label>
      <div className='flex flex-wrap justify-between'>
        <InputField
          width='w-1/2-20'
          inputName={hourName}
          register={register}
          errors={errors}
          rules={{ required: `Please select hour` }}
          type='select'
          options={[
            { value: '', label: 'Select Hour' },
            { value: '06', label: '06' },
            { value: '07', label: '07' },
            { value: '08', label: '08' },
            { value: '09', label: '09' },
            { value: '10', label: '10' },
            { value: '11', label: '11' },
            { value: '12', label: '12' },
          ]}
        />
        <InputField
          width='w-1/2-20'
          inputName={minuteName}
          register={register}
          errors={errors}
          type='select'
          rules={{ required: `Please select minute` }}
          options={[
            { value: '', label: 'Select Min' },
            { value: '00', label: '00' },
            { value: '15', label: '15' },
            { value: '30', label: '30' },
            { value: '45', label: '45' },
          ]}
        />
      </div>
    </div>
  );
};

export default TimeSelect;
