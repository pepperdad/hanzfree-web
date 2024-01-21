import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import Calendar from 'react-calendar';

import { reservationState } from '@shared/recoil';
import { PagePropsWithSetPage } from '@shared/types';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Page = ({ setPage }: PagePropsWithSetPage) => {
  const router = useRouter();

  const [reservation, setReservation] = useRecoilState(reservationState);
  const [airportToHotel, setAirportToHotel] = useState(false);
  const [hotelToAirport, setHotelToAirport] = useState(false);
  const [airportToHotelDate, setAirportToHotelDate] = useState<Value>();
  const [hotelToAirportDate, setHotelToAirportDate] = useState<Value>();
  const [airportToHotelQuantity, setAirportToHotelQuantity] = useState(1);
  const [hotelToAirportQuantity, setHotelToAirportQuantity] = useState(1);

  const toggleHandler = (type: string) => {
    if (type === 'airportToHotel') {
      setAirportToHotel((prev) => !prev);
    } else if (type === 'hotelToAirport') {
      setHotelToAirport((prev) => !prev);
    }
  };
  const isDateDisabled = (date: Date) => {
    const currentDate = new Date();
    return date < currentDate;
  };

  const increaseQuantity = (type: string) => {
    if (type === 'airportToHotel') {
      if (airportToHotelDate === undefined) {
        alert('please select a date');
        return;
      }
      setAirportToHotelQuantity((prevQuantity) => prevQuantity + 1);
    }
    if (type === 'hotelToAirport') {
      if (hotelToAirportDate === undefined) {
        alert('please select a date');
      }
      setHotelToAirportQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  // 수량 감소 함수
  const decreaseQuantity = (type: string) => {
    if (type === 'airportToHotel') {
      if (airportToHotelDate === undefined) {
        alert('please select a date');
        return;
      }
      setAirportToHotelQuantity((prevQuantity) => prevQuantity - 1);
    }
    if (type === 'hotelToAirport') {
      if (hotelToAirportDate === undefined) {
        alert('please select a date');
      }
      setHotelToAirportQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleNextPage = (type: string) => {
    if (type === 'airportToHotel') {
      if (airportToHotelDate === undefined) {
        alert('please select a date');
        return;
      }

      setReservation({
        ...reservation,
        method: 'airportToHotel',
        date: airportToHotelDate as Date,
        quantity: airportToHotelQuantity,
        price: 25000 * airportToHotelQuantity,
      });
    }

    if (type === 'hotelToAirport') {
      if (hotelToAirportDate === undefined) {
        alert('please select a date');
        return;
      }

      setReservation({
        ...reservation,
        method: 'hotelToAirport',
        date: hotelToAirportDate as Date,
        quantity: hotelToAirportQuantity,
        price: 25000 * hotelToAirportQuantity,
      });
    }

    // console.log('reservation', reservation);
    setPage(2);
  };

  // const handleReservation = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const form = e.target as HTMLFormElement;
  //   const firstName = form.firstName.value;
  //   const lastName = form.lastName.value;

  //   try {
  //     const res = await Instance.post('/user/reservation', {
  //       firstName,
  //       lastName,
  //     });

  //     if (res.status === 201) {
  //       router.push('/reservation/complete');
  //     }
  //   } catch (err: any) {
  //     console.log('err', err);
  //   }
  // };

  return (
    <div className='py-10 flex flex-col items-center'>
      <h1 className='mx-4 text-2xl md:text-4xl font-bold text-center text-blue-700'>
        Incheon International Airport (ICN) Luggage Service by HANZFREE
      </h1>
      <div className='mx-6 mt-10 flex gap-5 md:gap-10'>
        <Image src='/assets/reservation/airplane.svg' alt='airplane' width={180} height={180} />
        <Image src='/assets/reservation/left_arrow.svg' alt='left_arrow' width={45} height={45} />
        <Image src='/assets/reservation/luggage.svg' alt='luggage' width={150} height={150} />
        <Image src='/assets/reservation/right_arrow.svg' alt='right_arrow' width={45} height={45} />
        <Image src='/assets/reservation/home.svg' alt='home' width={180} height={180} />
      </div>

      <div className='flex w-full justify-center'>
        <div className='flex flex-col md:w-4/5 items-center'>
          <div className='flex items-center md:w-3/5 mt-8'>
            <div className='w-2.5 h-10 bg-blue-700 mr-3' />
            <div className='text-black text-3xl font-medium'>Package options</div>
          </div>

          <div className='mt-5 flex flex-col min-w-[360px] md:w-3/5 rounded-[35px] border border-zinc-500 px-3 md:px-5 py-5 mx-[1rem]'>
            <div className='flex justify-between items-center'>
              <div className='text-black text-3xl font-normal'>Airport to Hotel</div>
              <span className='p-2'>
                <Image
                  src='/assets/reservation/toggle.svg'
                  alt='toggle'
                  width={20}
                  height={20}
                  onClick={() => toggleHandler('airportToHotel')}
                />
              </span>
            </div>
            <div className='flex mt-5 items-center'>
              <div className='text-neutral-700 text-lg font-medium pr-2'>Per luggage</div>
              <div className='text-zinc-600 text-lg font-normal'>₩ 25,000</div>
            </div>

            <div className='flex items-end justify-between h-[44px]'>
              <div className='text-black text-[25px] font-normal '>₩ 25,000</div>
              <button
                className={`px-3 py-2 bg-blue-700 rounded-[10px] shadow text-white text-lg
                 ${airportToHotel && 'hidden'}`}
                onClick={() => toggleHandler('airportToHotel')}
              >
                Select
              </button>
            </div>

            {airportToHotel && (
              <div className='relative'>
                <div className='mt-4 pt-4 text-black text-2xl font-normal border-t'>
                  Select date & quantity
                </div>
                <div className='flex flex-wrap gap-x-12 gap-y-3 justify-center mt-2'>
                  <div className='flex flex-col justify-center'>
                    <div className='text-neutral-900 text-lg font-light absolute left-0 top-16'>
                      Please select an experience date
                    </div>
                    <Calendar
                      className='mt-[28px]'
                      value={airportToHotelDate}
                      onChange={setAirportToHotelDate}
                      locale='en'
                      calendarType='islamic'
                      prev2Label={null}
                      next2Label={null}
                      tileDisabled={({ date }) => isDateDisabled(date)}
                    />
                  </div>
                  <div className='flex flex-col grow justify-between'>
                    <div className='flex flex-col md:min-w-[285px]'>
                      <div className='text-neutral-900 text-lg font-light'>Select quantity</div>
                      <div className='flex justify-between pb-4 border-b'>
                        <div className='text-neutral-700 text-lg font-medium'>Per luggage</div>
                        <div className='w-24 text-black text-lg font-normal'>
                          {airportToHotelDate
                            ? `₩ ${(25000 * airportToHotelQuantity).toLocaleString('ko-KR')}`
                            : ''}
                        </div>
                        <div className='flex items-center w-24 justify-between'>
                          <button
                            className={`w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-[5px] shadow ${
                              !airportToHotelDate && 'opacity-50'
                            }`}
                            onClick={() => decreaseQuantity('airportToHotel')}
                          >
                            -
                          </button>
                          <span className={`px-4 ${!airportToHotelDate && 'opacity-50'}`}>
                            {airportToHotelQuantity}
                          </span>
                          <button
                            className={`w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-[5px] shadow ${
                              !airportToHotelDate && 'opacity-50'
                            }`}
                            onClick={() => increaseQuantity('airportToHotel')}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      className='py-2 bg-blue-500 hover:bg-blue-700 rounded-xl shadow text-white text-lg'
                      onClick={() => handleNextPage('airportToHotel')}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* hotel to airport  */}
          <div className='mt-5 flex flex-col min-w-[360px] md:w-3/5 rounded-[35px] border border-zinc-500 px-3 md:px-5 py-5 mx-[1rem]'>
            <div className='flex justify-between items-center'>
              <div className='text-black text-3xl font-normal'>Hotel to Airport</div>
              <span className='p-2'>
                <Image
                  src='/assets/reservation/toggle.svg'
                  alt='toggle'
                  width={20}
                  height={20}
                  onClick={() => toggleHandler('hotelToAirport')}
                />
              </span>
            </div>
            <div className='flex mt-5 items-center'>
              <div className='text-neutral-700 text-lg font-medium pr-2'>Per luggage</div>
              <div className='text-zinc-600 text-lg font-normal'>₩ 25,000</div>
            </div>

            <div className='flex items-end justify-between h-[44px]'>
              <div className='text-black text-[25px] font-normal '>₩ 25,000</div>
              <button
                className={`px-3 py-2 bg-blue-700 rounded-[10px] shadow text-white text-lg
                 ${hotelToAirport && 'hidden'}`}
                onClick={() => toggleHandler('hotelToAirport')}
              >
                Select
              </button>
            </div>

            {hotelToAirport && (
              <div className='relative'>
                <div className='mt-4 pt-4 text-black text-2xl font-normal border-t'>
                  Select date & quantity
                </div>
                <div className='flex flex-wrap gap-x-12 gap-y-3 justify-center mt-2'>
                  <div className='flex flex-col justify-center'>
                    <div className='text-neutral-900 text-lg font-light absolute left-0 top-16'>
                      Please select an experience date
                    </div>
                    <Calendar
                      className='mt-[28px]'
                      value={hotelToAirportDate}
                      onChange={setHotelToAirportDate}
                      locale='en'
                      calendarType='islamic'
                      prev2Label={null}
                      next2Label={null}
                      tileDisabled={({ date }) => isDateDisabled(date)}
                    />
                  </div>
                  <div className='flex flex-col grow justify-between'>
                    <div className='flex flex-col md:min-w-[285px]'>
                      <div className='text-neutral-900 text-lg font-light'>Select quantity</div>
                      <div className='flex justify-between pb-4 border-b'>
                        <div className='text-neutral-700 text-lg font-medium'>Per luggage</div>
                        <div className='w-24 text-black text-lg font-normal'>
                          {hotelToAirportDate
                            ? `₩ ${(25000 * hotelToAirportQuantity).toLocaleString('ko-KR')}`
                            : ''}
                        </div>
                        <div className='flex items-center w-24 justify-between'>
                          <button
                            className={`w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-[5px] shadow ${
                              !hotelToAirportDate && 'opacity-50'
                            }`}
                            onClick={() => decreaseQuantity('hotelToAirport')}
                          >
                            -
                          </button>
                          <span className={`px-4 ${!hotelToAirportDate && 'opacity-50'}`}>
                            {hotelToAirportQuantity}
                          </span>
                          <button
                            className={`w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-[5px] shadow ${
                              !hotelToAirportDate && 'opacity-50'
                            }`}
                            onClick={() => increaseQuantity('hotelToAirport')}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      className='py-2 bg-blue-500 hover:bg-blue-700 rounded-xl shadow text-white text-lg'
                      onClick={() => handleNextPage('hotelToAirport')}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
