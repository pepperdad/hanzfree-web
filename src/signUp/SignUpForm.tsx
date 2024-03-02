import { useEffect } from 'react';

import intlTelInput from 'intl-tel-input';

import Button from '@shared/components/Button';
import Input from '@shared/components/Input';

interface SignUpFormProps {
  onClick: (e: React.FormEvent<HTMLFormElement>) => void;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setDialCode: React.Dispatch<React.SetStateAction<string>>;
}

const SignUpForm = ({ onClick, setCountry, setDialCode }: SignUpFormProps) => {
  useEffect(() => {
    const input = document.querySelector('#phoneNumber') as Element;

    const iti = intlTelInput(input, {
      // IP 주소를 기반으로 가장 적합한 국가를 자동으로 선택
      initialCountry: 'auto',
      separateDialCode: true,
      autoPlaceholder: 'aggressive',
      geoIpLookup: (callback) => {
        fetch(`https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}`)
          .then((res) => res.json())
          .then((data) => callback(data.country))
          .catch(() => callback('us'));
      },
      utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js',
    });

    input.addEventListener('countrychange', () => {
      const { dialCode: itiDialCode, name } = iti.getSelectedCountryData();

      setDialCode(itiDialCode);
      setCountry(name);
    });
  }, []);

  return (
    <form className='flex flex-col items-center w-full gap-2' onSubmit={onClick}>
      <div className='flex w-full gap-4 md:gap-8'>
        <Input fullWidth placeholder='First name' name='firstName' label='First Name' />
        <Input fullWidth placeholder='Last name' name='lastName' label='Last Name' />
      </div>

      <Input fullWidth placeholder='Email' name='email' label='Email Address' />
      <div className='flex flex-col w-full'>
        <label className='text-sm md:text-base mb-1'>Phone Number</label>
        <input
          name='phoneNumber'
          id='phoneNumber'
          type='tel'
          // placeholder='Enter your number only'
          className='px-3 py-2 border border-gray-300 rounded-md w-full'
        />
      </div>
      <Input
        fullWidth
        placeholder='Enter your password'
        type='password'
        name='password'
        label='Password'
      />
      <Input
        fullWidth
        placeholder='Re-enter your password to verify'
        type='password'
        name='password-confirm'
        label='Password Confirm'
      />
      <Button fullWidth type='submit' buttonStyle='mt-4 bg-blue-700 hover:bg-blue-800'>
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
