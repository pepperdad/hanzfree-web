import React from 'react';

const TermCheck = ({ inputName, content, register, rules, errors }: any) => {
  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={inputName} className='mt-3 mb-1'>
        Please confirm that you acknowledge the following:
      </label>
      <div className='flex bg-slate-100 rounded-[20px] px-4 py-4 items-center'>
        <input type='checkbox' className='w-5 h-5 mr-4 shrink-0' {...register(inputName, rules)} />
        <span className='text-zinc-800 font-normal'>{content}</span>
      </div>
      <span className='text-red-500'>
        {errors?.[inputName]?.message && `⚠ ${String(errors?.[inputName]?.message)}`}
      </span>
    </div>
  );
};

export default TermCheck;
