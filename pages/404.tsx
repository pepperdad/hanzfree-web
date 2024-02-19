import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@shared/components/shadcn/ui/button';

const index = () => {
  const router = useRouter();

  return (
    <div
      className='flex-center flex-col h-screen bg-top md:bg-bottom'
      style={{ backgroundImage: `url('/assets/shared/question_marks_background.jpg')` }}
    >
      <div className='relative w-64 md:w-80 h-16'>
        <Image src='/assets/header/logo_string.svg' alt='logo' layout='fill' />
      </div>
      <p className='text-4xl md:text-6xl mt-10'>😔</p>
      <h1 className='text-xl md:text-3xl mt-2'>Ooups, page not found</h1>
      <p className='text-sm text-gray-500 p-5'>
        we are very sorry for the inconvenience. It looks like you&apos;re trying to access a page
        that has been deleted or never even existed.
      </p>
      <Button
        className='shadow-lg px-10 py-6 bg-blue-700 hover:bg-blue-800'
        onClick={() => router.push('/')}
      >
        BACK TO HOMEPAGE
      </Button>
    </div>
  );
};

export default index;
