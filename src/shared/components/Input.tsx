import React from 'react';

interface InputProps extends Partial<React.InputHTMLAttributes<HTMLInputElement>> {
  label?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({ label, fullWidth, ...props }) => {
  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : ''}`}>
      {label && <label className='mb-1'>{label}</label>}
      <input
        className={`px-3 py-2 border border-gray-300 rounded-md ${fullWidth ? 'w-full' : ''}`}
        {...props}
      />
    </div>
  );
};

export default Input;
