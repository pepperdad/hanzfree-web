import React from 'react';

interface ButtonProps extends Partial<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ fullWidth, ...props }) => {
  const { children, onClick } = props;
  return (
    <button
      className={`px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 ${
        fullWidth ? 'w-full' : ''
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
