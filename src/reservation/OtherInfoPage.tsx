import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { useRecoilState } from 'recoil';

import { useForm } from 'react-hook-form';

import intlTelInput from 'intl-tel-input';

import Instance from '@pages/api/config';
import { reservationState } from '@shared/recoil';

const OtherInfoPage = ({ userData, setPage }: any) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'all' });

  const [reservation, setReservation] = useRecoilState(reservationState);

  const [country, setCountry] = useState<string>('');
  const [dialCode, setDialCode] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const onValid = async (data: any) => {
    if (isSubmitting) return;
    try {
      const formData = {
        ...data,
        country,
        dialCode,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        method: reservation.method,
        date: reservation.date,
        quantity: reservation.quantity,
        price: reservation.price,
      };

      const res = await Instance.post('/reservation', formData);

      if (res.status === 201) {
        setReservation(formData);
        setPage(3);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const input = document.querySelector('#phoneNumber') as Element;

    const iti = intlTelInput(input, {
      initialCountry: 'auto',
      separateDialCode: true,
      autoPlaceholder: 'aggressive',
      geoIpLookup: (callback) => {
        fetch('https://ipapi.co/json')
          .then((res) => res.json())
          .then((data) => callback(data.country_code))
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
    <div className='flex w-full justify-center md:bg-[#f5f5f5]'>
      <div className='flex flex-col w-full md:w-4/5 items-center mx-4 bg-white my-6 py-10 rounded-3xl'>
        <div className='flex items-center w-full md:w-4/5'>
          <div className='w-2.5 h-10 bg-blue-700 mr-3' />
          <div className='text-black text-3xl font-medium'>Other info</div>
        </div>
        <div className='flex justify-between md:w-4/5 mt-6 p-4 rounded-[35px] border border-zinc-500'>
          <div className='flex w-24 md:w-fit shrink-0'>
            <Image src='/assets/reservation/delivery.svg' alt='delivery' width={155} height={110} />
          </div>
          <div className='flex flex-col ml-4 justify-between'>
            <div className='text-black text-2xl md:text-3xl font-medium'>
              Incheon International Airport (ICN) Luggage Service by HANZFREE
            </div>
            <div className='text-neutral-600 text-lg md:text-2xl font-normal'>
              {reservation?.method === 'airportToHotel'
                ? 'Airport to Hotel'
                : reservation?.method === 'hotelToAirport'
                  ? 'Hotel to Airport'
                  : ''}
            </div>
          </div>
        </div>

        <div className='md:w-4/5 mt-10'>
          <form
            onSubmit={handleSubmit(onValid)}
            className='flex flex-col md:flex-row flex-wrap justify-between gap-y-2 md:gap-y-3'
          >
            <div className='flex flex-col md:w-1/2-20'>
              <label htmlFor='hotelName' className='mb-1'>
                Hotel Name
              </label>
              <input
                className={`input ${
                  errors?.hotelName ? 'border border-red-500' : 'border-gray-300'
                } `}
                {...register('hotelName', {
                  required: 'please enter your hotel name',
                  //   pattern: {
                  //     value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                  //     message: 'Only naver.com emails allowed',
                  //   },
                  //   minLength: {
                  //     message: 'The username should be longer than 5 chars.',
                  //     value: 5,
                  //   },
                })}
                type='text'
                placeholder='Please enter'
              />
              <span className='text-red-500'>
                {errors?.hotelName?.message ? `⚠ ${String(errors?.hotelName?.message)}` : ''}
              </span>
            </div>

            <div className='flex flex-col md:w-1/2-20'>
              <label htmlFor='hotelAddress' className='mb-1'>
                Hotel Address
              </label>
              <input
                className={`input ${
                  errors?.hotelAddress ? 'border border-red-500' : 'border-gray-300'
                } `}
                {...register('hotelAddress', {
                  required: 'please enter your hotel address',
                })}
                type='text'
                placeholder='Please enter'
              />
              <span className='text-red-500'>
                {errors?.hotelAddress?.message ? `⚠ ${String(errors?.hotelAddress?.message)}` : ''}
              </span>
            </div>

            <div className='flex flex-col md:w-1/2-20'>
              <label htmlFor='hotelRepresentativeName' className='mb-1'>
                Representative name of the Hotel reservation
              </label>
              <input
                className={`input ${
                  errors?.hotelRepresentativeName ? 'border border-red-500' : 'border-gray-300'
                } `}
                {...register('hotelRepresentativeName', {
                  required: 'please enter hotel representative name',
                })}
                type='text'
                placeholder='Please enter'
              />
              <span className='text-red-500'>
                {errors?.hotelRepresentativeName?.message
                  ? `⚠ ${String(errors?.hotelRepresentativeName?.message)}`
                  : ''}
              </span>
            </div>

            <div className='flex flex-col md:w-1/2-20'>
              <label htmlFor='airportTerminal' className='mb-1'>
                Airport Terminal
              </label>
              <select
                className={`input ${
                  errors?.airportTerminal ? 'border border-red-500' : 'border-gray-300'
                } `}
                {...register('airportTerminal', {
                  required: 'select one option',
                })}
              >
                <option value=''>Select terminal</option>
                <option value='1'>Terminal 1</option>
                <option value='2'>Terminal 2</option>
              </select>
              <span className='text-red-500'>
                {errors?.airportTerminal?.message
                  ? `⚠ ${String(errors?.airportTerminal?.message)}`
                  : ''}
              </span>
            </div>

            <div className='flex flex-col md:w-1/2-20'>
              <label htmlFor='flightNumber' className='mb-1'>
                Flight Number
                {reservation?.method === 'airportToHotel'
                  ? '(Arrival)'
                  : reservation?.method === 'hotelToAirport'
                    ? '(Departure)'
                    : ''}
              </label>
              <input
                className={`input ${
                  errors?.flightNumber ? 'border border-red-500' : 'border-gray-300'
                } `}
                {...register('flightNumber', {
                  required: 'please enter your flight number',
                })}
                type='text'
                placeholder='Please enter'
              />
              <span className='text-red-500'>
                {errors?.flightNumber?.message ? `⚠ ${String(errors?.flightNumber?.message)}` : ''}
              </span>
            </div>

            <div className='w-1/2' />

            {reservation.method === 'airportToHotel' ? (
              <div className='flex flex-col md:w-1/2-20'>
                <label htmlFor='arrivalTime' className='mb-1'>
                  Arrival time at airport
                </label>

                <div className='flex flex-wrap justify-between'>
                  <select
                    className={`input w-1/2-20 h-full ${
                      errors?.arrivalTimeHour ? 'border border-red-500' : 'border-gray-300'
                    } `}
                    {...register('arrivalTimeHour', {
                      required: 'select one option',
                    })}
                  >
                    <option value='' aria-label='Select an option' />
                    <option value='06'>06</option>
                    <option value='07'>07</option>
                    <option value='08'>08</option>
                    <option value='09'>09</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                  </select>

                  <select
                    className={`input w-1/2-20 ${
                      errors?.arrivalTimeMin ? 'border border-red-500' : 'border-gray-300'
                    } `}
                    {...register('arrivalTimeMin', {
                      required: 'select one option',
                    })}
                  >
                    <option value='' aria-label='Select an option' />
                    <option value='00'>00</option>
                    <option value='05'>05</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='20'>20</option>
                    <option value='25'>25</option>
                    <option value='30'>30</option>
                    <option value='35'>35</option>
                    <option value='40'>40</option>
                    <option value='45'>45</option>
                    <option value='50'>50</option>
                    <option value='55'>45</option>
                  </select>
                </div>
                {errors?.arrivalTimeHour || errors?.arrivalTimeMin ? (
                  <span className='text-red-500'>{`⚠ select arrival time `}</span>
                ) : null}
              </div>
            ) : reservation.method === 'hotelToAirport' ? (
              <div className='flex flex-col md:w-1/2-20'>
                <label htmlFor='departureTime' className='mb-1'>
                  Departure time at hotel
                </label>

                <div className='flex flex-wrap justify-between'>
                  <select
                    className={`input w-1/2-20 h-full ${
                      errors?.departureTimeHour ? 'border border-red-500' : 'border-gray-300'
                    } `}
                    {...register('departureTimeHour', {
                      required: 'select one option',
                    })}
                  >
                    <option value='' aria-label='Select an option' />
                    <option value='06'>06</option>
                    <option value='07'>07</option>
                    <option value='08'>08</option>
                    <option value='09'>09</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                  </select>

                  <select
                    className={`input w-1/2-20 ${
                      errors?.departureTimeMin ? 'border border-red-500' : 'border-gray-300'
                    } `}
                    {...register('departureTimeMin', {
                      required: 'select one option',
                    })}
                  >
                    <option value='' aria-label='Select an option' />
                    <option value='00'>00</option>
                    <option value='15'>15</option>
                    <option value='30'>30</option>
                    <option value='45'>45</option>
                  </select>
                </div>
                {errors?.departureTimeHour || errors?.departureTimeMin ? (
                  <span className='text-red-500'>{`⚠ select departure time `}</span>
                ) : null}
              </div>
            ) : null}

            {reservation.method === 'airportToHotel' ? (
              <div className='flex flex-col md:w-1/2-20'>
                <label htmlFor='dropOffTime' className='mb-1'>
                  Drop off luggage at the airport
                </label>

                <div className='flex flex-wrap justify-between'>
                  <select
                    className={`input w-1/2-20 h-full ${
                      errors?.dropOffTimeHour ? 'border border-red-500' : 'border-gray-300'
                    } `}
                    {...register('dropOffTimeHour', {
                      required: 'select one option',
                    })}
                  >
                    <option value='' aria-label='Select an option' />
                    <option value='00'>00</option>
                    <option value='15'>15</option>
                    <option value='30'>30</option>
                    <option value='45'>45</option>
                  </select>

                  <select
                    className={`input w-1/2-20 ${
                      errors?.dropOffTimeMin ? 'border border-red-500' : 'border-gray-300'
                    } `}
                    {...register('dropOffTimeMin', {
                      required: 'select one option',
                    })}
                  >
                    <option value='' aria-label='Select an option' />
                    <option value='00'>00</option>
                    <option value='15'>15</option>
                    <option value='30'>30</option>
                    <option value='45'>45</option>
                  </select>
                </div>
                {errors?.dropoffTimeHour || errors?.dropOffTimeMin ? (
                  <span className='text-red-500'>{`⚠ select drop off time `}</span>
                ) : null}
              </div>
            ) : reservation.method === 'hotelToAirport' ? (
              <div className='flex flex-col md:w-1/2-20'>
                <label htmlFor='pickUpTime' className='mb-1'>
                  Pick up luggage at the airport
                </label>

                <div className='flex flex-wrap justify-between'>
                  <select
                    className={`input w-1/2-20 h-full ${
                      errors?.pickUpTimeHour ? 'border border-red-500' : 'border-gray-300'
                    } `}
                    {...register('pickUpTimeHour', {
                      required: 'select one option',
                    })}
                  >
                    <option value='' aria-label='Select an option' />
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                  </select>

                  <select
                    className={`input w-1/2-20 ${
                      errors?.pickUpTimeMin ? 'border border-red-500' : 'border-gray-300'
                    } `}
                    {...register('pickUpTimeMin', {
                      required: 'select one option',
                    })}
                  >
                    <option value='' aria-label='Select an option' />
                    <option value='00'>00</option>
                    <option value='15'>15</option>
                    <option value='30'>30</option>
                    <option value='45'>45</option>
                  </select>
                </div>
                {errors?.pickUpTimeHour || errors?.pickUpTimeMin ? (
                  <span className='text-red-500'>{`⚠ select pick up time `}</span>
                ) : null}
              </div>
            ) : null}

            <div className='flex flex-col md:w-1/2-20'>
              <label htmlFor='contactId' className='mb-1'>
                WhatsApp/Line/WeChat/Kakao Talk
              </label>
              <input
                className={`input ${
                  errors?.contactId ? 'border border-red-500' : 'border-gray-300'
                } `}
                {...register('contactId', {
                  required: 'please enter your contact id',
                })}
                type='text'
                placeholder='Enter app and Id (ex. WhatsApp +8210123456789)'
              />
              <span className='text-red-500'>
                {errors?.contactId?.message ? `⚠ ${String(errors?.contactId?.message)}` : ''}
              </span>
            </div>

            <div className='flex flex-col md:w-1/2-20'>
              <label htmlFor='phoneNumber' className='mb-1'>
                Phone Number
              </label>
              <input
                id='phoneNumber'
                type='tel'
                className={`input ${
                  errors?.phoneNumber ? 'border border-red-500' : 'border-gray-300'
                } `}
                {...register('phoneNumber', {
                  required: 'please enter your phone number',
                })}
                placeholder='E.g +852 1234 5678'
                onChange={(e) => setPhone(e.target.value)}
              />
              <span className='text-red-500'>
                {errors?.phoneNumber?.message ? `⚠ ${String(errors?.phoneNumber?.message)}` : ''}
              </span>
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='phoneNumber' className='mt-3 mb-1'>
                Please confirm that you acknowledge the following:
              </label>
              <div className='flex bg-slate-100 rounded-[20px] px-4 py-4 items-center'>
                <input type='checkbox' className='w-5 h-5 mr-4 shrink-0' />
                <span className='text-zinc-800 font-normal'>
                  Make sure the name of the hotel reservation is the same as HANZFREE reservation
                  name.
                </span>
              </div>
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='phoneNumber' className='mt-3 mb-1'>
                Please confirm that you acknowledge the following:
              </label>
              <div className='flex bg-slate-100 rounded-[20px] px-4 py-4 items-center'>
                <input type='checkbox' className='w-5 h-5 mr-4 shrink-0' />
                <span className='text-zinc-800 font-normal'>
                  Same day delivery only applied to pick-up during 08:00~17:00 Next day delivery for
                  the luggage picked up after 17:00
                </span>
              </div>
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='phoneNumber' className='mt-3 mb-1'>
                Please confirm that you acknowledge the following:
              </label>
              <div className='flex bg-slate-100 rounded-[20px] px-4 py-4 items-center'>
                <input type='checkbox' className='w-5 h-5 mr-4 shrink-0' />
                <span className='text-zinc-800 font-normal'>
                  I understand that I need to contact HANZFREE via messenger app after booking on
                  HANZFREE your booking number and name. If you do not contact HANZFREE 72 hours
                  before your reservation date, your booking will be cancelled.
                </span>
              </div>
            </div>

            <div className='w-full'>
              <div className='flex items-center mt-8'>
                <div className='w-2.5 h-10 bg-blue-700 mr-3' />
                <div className='text-black text-3xl font-medium'>Contact Info</div>
              </div>

              <div className='my-2 text-neutral-600 text-lg font-normal'>
                We&rsquo;ll only contact you if there&rsquo;s any updates to your booking
              </div>

              <div className='rounded-2xl border border-zinc-500 p-4'>
                <div className='flex py-2'>
                  <div className='text-neutral-600 text-xl w-1/2'>First Name</div>
                  <div className='text-neutral-600 text-xl font-semibold grow'>
                    {userData.firstName.toUpperCase()}
                  </div>
                </div>

                <div className='flex py-2'>
                  <div className='text-neutral-600 text-xl w-1/2'>Last Name</div>
                  <div className='text-neutral-600 text-xl font-semibold grow'>
                    {userData.lastName.toUpperCase()}
                  </div>
                </div>

                {userData.phoneNumber ? (
                  <div className='flex py-2'>
                    <div className='text-neutral-600 text-xl w-1/2'>Phone Number</div>
                    <div className='text-neutral-600 text-xl font-semibold grow'>
                      {userData.dialCode}-{userData.phoneNumber}
                    </div>
                  </div>
                ) : (
                  <div className='flex py-2'>
                    <div className='text-neutral-600 text-xl w-1/2'>Phone Number</div>
                    <div className='text-neutral-600 text-xl font-semibold grow'>
                      {dialCode}-{phone}
                    </div>
                  </div>
                )}

                <div className='flex py-2'>
                  <div className='text-neutral-600 text-xl w-1/2'>
                    Email(for updates your booking)
                  </div>
                  <div className='text-neutral-600 text-xl font-semibold grow'>
                    {userData.email}
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-4 text-neutral-600 font-normal'>
              By continuing, you acknowledge and agree to HANZFREE Geneal Terms of Use and Privacy
              Policy.
            </div>

            <div className='w-full px-5 py-3 rounded-[20px] border border-blue-300 bg-blue-50'>
              Please enter your info carefully. Once submitted it cannot be changed.
            </div>

            <div className='flex w-full mt-4'>
              <div className='grow text-neutral-600 text-md font-normal'>
                Your booking will be submitted once you continue to the next step. <br />
                (You can choose your payment method in the next step){' '}
              </div>
              <button
                className='px-3 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg'
                type='submit'
              >
                Go to payment
              </button>
            </div>

            {/* <Onas register={register} /> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtherInfoPage;
