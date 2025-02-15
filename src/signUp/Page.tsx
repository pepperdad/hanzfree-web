import { useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Instance from '@pages/api/config';
import SignInGoogle from '@shared/components/SignInGoogle';
import { PagePropsWithSetPage } from '@shared/types';

import SignUpForm from './SignUpForm';

const Loading = dynamic(() => import('@shared/components/animation/loading'), { ssr: false });

const Page = ({ setPage }: PagePropsWithSetPage) => {
  const router = useRouter();
  // TODO: 리다이렉트 from 페이지로
  const { from } = router.query;

  const [country, setCountry] = useState<string>('');
  const [dialCode, setDialCode] = useState<string>('');
  const [loading, setLoading] = useState(false);

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

    if (!password) {
      alert('Please enter your password.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    setLoading(true);
    if (loading) return;

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

      setLoading(false);

      if (res.status === 409) {
        alert('This email already exists.');
        return;
      }

      if (res.status === 201) {
        setPage(2);
      }
    } catch (err: any) {
      console.log('err', err);
      setLoading(false);
    }
  };

  return (
    <div className='py-8'>
      {loading && (
        <div className='absolute top-0 left-0 z-10 flex-center w-screen h-screen opacity-80 bg-slate-50'>
          <Loading />
        </div>
      )}
      <h1 className='text-3xl md:text-4xl font-bold text-center'>Sign Up</h1>
      <h2 className='pb-8 text-sm md:text-lg text-center text-gray-500'>
        create an account to continue
      </h2>
      <div className='flex justify-center'>
        <div className='relative w-4/5 md:w-2/5'>
          <SignUpForm onClick={onClick} setCountry={setCountry} setDialCode={setDialCode} />

          <SignInGoogle from={from} />

          <div className='flex justify-center mt-4 text-sm md:text-base'>
            <p className='text-gray-400'>Already have an account?</p>
            <span
              className='ml-3 text-blue-700 hover:text-blue-900 cursor-pointer underline underline-offset-2 text-sm md:text-base'
              onClick={() => router.push('/login')}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
