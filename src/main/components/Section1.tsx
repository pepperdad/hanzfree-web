import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Section1 = () => {
  const router = useRouter();

  return (
    <div id='section1' className=''>
      <div className='md:flex hidden'>
        <div className='flex-col w-2/3 shrink-0'>
          <div className='flex-center'>
            <Image src='/assets/logo_small.svg' alt='section1' width={218} height={244} />
            <div className='text-blue-700 text-lg font-normal'>
              Travel light with HanzFree, enjoy to the fullest! <br />
              Enjoy your journey with both hands free. <br />
              Book easily for convenience at your fingertips!
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-6 w-full'>
          <button
            className='h-32 bg-blue-700 rounded-[50px] hover:bg-blue-800 transition duration-250 ease-in-out'
            onClick={() => {
              router.push('/reservation');
            }}
          >
            <div className='flex-center gap-3'>
              <Image src='/assets/bag.svg' alt='bag' width={51} height={40} />
              <span className='text-3xl font-normal text-white'>Book Now</span>
            </div>
          </button>
          <button
            className='h-32 bg-white border-2 border-blue-700 rounded-[50px] hover:bg-slate-100 transition duration-250 ease-in-out'
            onClick={() => {
              router.push('/booking');
            }}
          >
            <div className='flex-center gap-3'>
              <Image src='/assets/calender.svg' alt='bag' width={39} height={43} />
              <span className='text-3xl font-normal text-blue-700'>My Booking</span>
            </div>
          </button>
        </div>
      </div>

      <div className='md:hidden flex flex-col'>
        <div className='flex-center'>
          <Image src='/assets/logo_small.svg' alt='section1' width={109} height={120} />
        </div>
        <div className='text-blue-700 text-lg font-normal'>
          Travel light with HanzFree, enjoy to the fullest! <br />
          Enjoy your journey with both hands free. <br />
          Book easily for convenience at your fingertips!
        </div>
        <div className='flex flex-col gap-3 items-center'>
          <button
            className='w-[300px] h-16 bg-blue-700 rounded-[30px] hover:bg-blue-800'
            onClick={() => {
              router.push('/reservation');
            }}
          >
            <div className='flex-center gap-6'>
              <Image src='/assets/bag.svg' alt='bag' width={36} height={30} />
              <span className='text-2xl font-normal text-white'> Book Now</span>
            </div>
          </button>
          <button className='w-[300px] h-16 bg-white border-2 border-blue-700 rounded-[30px] hover:bg-slate-100'>
            <div className='flex-center gap-3'>
              <Image src='/assets/calender.svg' alt='bag' width={40} height={32} />
              <span className='text-2xl font-normal text-blue-700'>My Booking</span>
            </div>
          </button>
        </div>
      </div>

      <ol>
        <li>
          <Link href='/test'>
            <button>test</button>
          </Link>
        </li>
        <li>
          <Link href='/login'>
            <button>login</button>
          </Link>
        </li>
        <li>
          <Link href='/admin'>
            <button>admin</button>
          </Link>
        </li>
        <li>
          <Link href='/admin/dashboard'>
            <button>admin dashboard</button>
          </Link>
        </li>

        <li>
          <Link href='/reservation'>
            <button>reservation</button>
          </Link>
        </li>
      </ol>
    </div>
  );
};

export default Section1;
