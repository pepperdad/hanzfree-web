import React from 'react';

import { useForm } from 'react-hook-form';

const Onas = ({ register }: any) => {
  //   console.log(watch());
  return (
    <div>
      <label htmlFor='hhi'>hhhhi</label>
      <input
        type='text'
        {...register('test2', {
          required: true,
          maxLength: {
            value: 16,
            message: 'Should not exceed 16',
          },
        })}
      />
    </div>
  );
};

export default Onas;
