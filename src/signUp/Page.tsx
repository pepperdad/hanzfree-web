import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import Instance from '@pages/api/config';
import SignUpForm from 'signUp/SignUpForm';

const Page = () => {
  const router = useRouter();
  // TODO: 리다이렉트 from 페이지로
  const { from } = router.query;

  const [countryCode, setCountryCode] = useState<string>('');
  const [dialCode, setDialCode] = useState<string>('');

  const googleLoginHandler = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/login?from=${from}`;
  };

  const onClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const phone = form.phone.value;
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

    if (!countryCode || !phone) {
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
        countryCode,
        phone,
        password,
      };

      alert('Form is valid, submit data');
      console.log('formData', formData);
      // TODO: 회원가입 API 호출 (entity 수정 후)
      // const res = await Instance.post('/user/signup', { email, password, firstName, lastName });

      // if (res.status === 400) {
      //   alert('This email already exists.');
      //   return;
      // }

      // if (res.status === 201) {
      //   router.push('/login');
      // }
    } catch (err: any) {
      console.log('err', err);
    }
  };

  return (
    <div className='pt-16'>
      <h1 className='pb-10 text-4xl font-bold text-center'>Sign Up</h1>
      <div className='flex justify-center'>
        <div className='relative w-3/5 md:w-1/3'>
          <SignUpForm onClick={onClick} setCountryCode={setCountryCode} setDialCode={setDialCode} />

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
              Log In
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
