import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import Instance from '@pages/api/config';
import { PagePropsWithSetPage } from '@shared/types';

import SignUpForm from './SignUpForm';

const Page = ({ setPage }: PagePropsWithSetPage) => {
  const router = useRouter();
  // TODO: 리다이렉트 from 페이지로
  const { from } = router.query;

  const [country, setCountry] = useState<string>('');
  const [dialCode, setDialCode] = useState<string>('');

  const googleLoginHandler = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/login?from=${from}`;
  };

  const onClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 로그인 유효성 검사 상세히 추가

    const form = e.target as HTMLFormElement;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;
    const password = form.password.value;
    const passwordConfirm = form['password-confirm'].value;

    // 이름 또는 성이 비어 있는 경우
    if (!firstName || !lastName) {
      alert('Please enter both first name and last name.');
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!country || !phoneNumber) {
      alert('Please enter your phone number.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    try {
      const formData = {
        firstName,
        lastName,
        email,
        dialCode,
        country,
        phoneNumber,
        password,
      };

      const res = await Instance.post('/user/signup', formData);

      // console.log('res', res);

      if (res.status === 409) {
        alert('This email already exists.');
        return;
      }

      if (res.status === 201) {
        setPage(2);
      }
    } catch (err: any) {
      console.log('err', err);
    }
  };

  return (
    <div className='py-8'>
      <h1 className='text-4xl font-bold text-center'>Sign Up</h1>
      <h2 className='pb-8 text-lg text-center text-gray-500'>create an account to continue</h2>
      <div className='flex justify-center'>
        <div className='relative w-3/5 md:w-1/3'>
          <SignUpForm onClick={onClick} setCountry={setCountry} setDialCode={setDialCode} />

          <div className='flex flex-col items-center justify-center mt-10 border-y py-6'>
            <div className='text-center mb-3'>Or sign in with:</div>
            <div
              onClick={() => googleLoginHandler()}
              className='flex items-center border-2 hover:border-blue-700 cursor-pointer hover:bg-blue-700 hover:text-white text-gray-400'
            >
              <button className='p-2 flex-center bg-white'>
                <Image src='/assets/google_icon.svg' alt='google login' width={36} height={36} />
              </button>
              <div className='h-full p-3 font-bold flex-center'>Sign in with Google</div>
            </div>
          </div>

          <div className='flex justify-center mt-4'>
            <div className='text-gray-400'>Already have an account?</div>
            <div
              className='ml-2 text-blue-700 cursor-pointer'
              onClick={() => router.push('/login')}
            >
              Sign in
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
