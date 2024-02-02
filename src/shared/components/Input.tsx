import React, { useState } from 'react';

import Image from 'next/image';

interface InputProps extends Partial<React.InputHTMLAttributes<HTMLInputElement>> {
  label?: string;
  fullWidth?: boolean;
  inputStyle?: string;
}

const Input: React.FC<InputProps> = ({ label, fullWidth, type, inputStyle, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : ''}`}>
      {label && <label className='mb-1'>{label}</label>}
      <div className='relative'>
        <input
          type={type === 'password' && !showPassword ? 'password' : 'text'}
          className={`px-3 py-2 border border-gray-300 rounded-md ${inputStyle || ''} ${
            fullWidth ? 'w-full' : ''
          }`}
          {...props}
        />
        {type === 'password' && (
          <button
            type='button'
            className='absolute right-0 flex items-center px-3 inset-y-4'
            onClick={toggleShowPassword}
          >
            <Image
              src={
                showPassword
                  ? '/assets/shared/hidden_password.png'
                  : '/assets/shared/show_password.png'
              }
              alt='show password'
              width={25}
              height={25}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
