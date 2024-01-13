import React, { useState } from 'react';

import Image from 'next/image';

interface InputProps extends Partial<React.InputHTMLAttributes<HTMLInputElement>> {
  label?: string;
  fullWidth?: boolean;
  inputStyle?: string;
}

const Input: React.FC<InputProps> = ({ label, fullWidth, inputStyle, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : ''}`}>
      {label && <label className='mb-1'>{label}</label>}
      <div className='relative'>
        <input
          type={props.type === 'password' && !showPassword ? 'password' : 'text'}
          className={`px-3 py-2 border border-gray-300 rounded-md ${inputStyle || ''} ${
            fullWidth ? 'w-full' : ''
          }`}
          {...props}
        />
        {props.type === 'password' && (
          <button
            type='button'
            className='absolute right-0 flex items-center px-3 inset-y-6'
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <Image src='/assets/show_password.svg' alt='show password' width={24} height={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
