import React, { forwardRef } from 'react';

const InputField = forwardRef(
  (
    {
      label,
      inputName,
      register,
      errors,
      placeholder,
      type = 'text',
      options,
      rules,
      onChange,
      ...props
    }: any,
    ref,
  ) => {
    return (
      <div className='flex flex-col md:w-1/2-20'>
        {label && (
          <label htmlFor={inputName} className='mb-1'>
            {label}
          </label>
        )}
        {type === 'select' ? (
          <select
            className={`input ${errors?.[inputName] ? 'border border-red-500' : 'border-gray-300'}`}
            {...register(inputName, rules)}
          >
            {options.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className={`input ${errors?.[inputName] ? 'border border-red-500' : 'border-gray-300'}`}
            type={type}
            placeholder={placeholder || `Please enter ${label.toLowerCase()}`}
            ref={ref}
            onChange={onChange}
            {...register(inputName, rules)}
          />
        )}
        <span className='text-red-500'>
          {errors?.[inputName]?.message && `⚠ ${String(errors?.[inputName]?.message)}`}
        </span>
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
