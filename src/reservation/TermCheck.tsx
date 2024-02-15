import React, { useState } from 'react';

const TermCheck = ({ inputName, content, register, rules, errors }: any) => {
  // const [checked, setChecked] = useState(false);

  // const handleCheckboxChange = () => {
  //   setChecked(!checked);
  // };

  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={inputName} className='mt-3 mb-1'>
        Please confirm that you acknowledge the following:
      </label>
      <div
        className='flex bg-slate-100 rounded-xl p-3 items-center'
        // onClick={handleCheckboxChange}
      >
        <input
          type='checkbox'
          className='w-5 h-5 mr-4 shrink-0 cursor-pointer'
          {...register(inputName, rules)}
        />
        <span className='text-zinc-800 font-normal text-sm md:text-base'>{content}</span>
      </div>
      <span className='text-red-500'>
        {errors?.[inputName]?.message && `⚠ ${String(errors?.[inputName]?.message)}`}
      </span>
    </div>
  );
};

export default TermCheck;
