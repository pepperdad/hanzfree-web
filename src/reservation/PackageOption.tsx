import React, { useContext, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import Calendar from 'react-calendar';

import Alert from '@shared/components/Alert';
import { reservationState } from '@shared/recoil';
import { DateType } from '@shared/types';

import { DELIVERY_TYPE } from './constants';
import { ReservationPageContext } from './context';
import Tag from './Tag';

interface PackageOptionProps {
  type: keyof typeof DELIVERY_TYPE;
}

const PackageOption = ({ type }: PackageOptionProps) => {
  const router = useRouter();

  const setPage = useContext(ReservationPageContext);
  const [reservation, setReservation] = useRecoilState(reservationState);
  const [onToggle, setOnToggle] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateType>();
  const [quantity, setQuantity] = useState(1);
  const [onAlert, setOnAlert] = useState({
    open: false,
    message: '',
  });

  const toggleHandler = () => {
    setOnToggle((prev) => !prev);
  };

  const isDateDisabled = (date: Date) => {
    const currentDate = new Date();
    return date < currentDate;
  };

  const increaseQuantity = () => {
    if (selectedDate === undefined) {
      setOnAlert({
        open: true,
        message: 'Please select a date',
      });
      return;
    }
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 0) {
      setOnAlert({
        open: true,
        message: 'quantity cannot be less than 0',
      });
      return;
    }
    if (selectedDate === undefined) {
      setOnAlert({
        open: true,
        message: 'Please select a date',
      });
      return;
    }
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleNextPage = () => {
    if (selectedDate === undefined) {
      setOnAlert({
        open: true,
        message: 'Please select a date',
      });
    } else {
      const currentDate = new Date();
      const utcOffsetInMinutes = currentDate.getTimezoneOffset();
      const adjustedReservationDate = new Date(
        (selectedDate as Date).getTime() - utcOffsetInMinutes * 60 * 1000,
      );

      setReservation({
        ...reservation,
        method: type,
        date: adjustedReservationDate,
        quantity,
        price: 25000 * quantity,
      });

      // console.log('adjustedReservationDate', typeof adjustedReservationDate);
      const formattedDate =
        adjustedReservationDate.getFullYear().toString() +
        `0${adjustedReservationDate.getMonth() + 1}`.slice(-2) +
        `0${adjustedReservationDate.getDate()}`.slice(-2);

      // console.log('method', type);
      // console.log('date', formattedDate, selectedDate, adjustedReservationDate);
      // console.log('quantity', quantity);
      // console.log('price', 25000 * quantity);
      setPage(2);
      router.push({
        query: { method: type, quantity, date: adjustedReservationDate.toDateString() },
      });
    }
  };

  return (
    <div className='mt-5 flex flex-col min-w-[360px] md:w-3/5 rounded-3xl border border-zinc-300 px-3 md:px-5 py-5 mx-3'>
      {onAlert && <Alert onAlert={onAlert} setOnAlert={setOnAlert} />}
      <div className='flex justify-between items-center'>
        <div className='text-gray-800 text-2xl font-bold'>{DELIVERY_TYPE[type]}</div>
        <span className='flex-center rounded-lg p-2 hover:bg-slate-100' onClick={toggleHandler}>
          <Image
            src='/assets/reservation/toggle.svg'
            alt='toggle'
            width={20}
            height={20}
            style={{
              transform: onToggle ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s ease-in-out',
              cursor: 'pointer',
            }}
          />
        </span>
      </div>

      <div className='inline-flex flex-wrap mt-2 gap-2'>
        <Tag content='Conditional cancellation' />
        <Tag content='24-hour confirmation' />
        <Tag content='Valid on the selected date' />
      </div>

      <div className='flex mt-4 items-end'>
        <div className='text-neutral-500 text-lg pr-3'>Per luggage</div>
        <div className='text-neutral-800 font-medium'>₩ 25,000</div>
      </div>

      <div className='flex items-center justify-between h-[44px] mt-2'>
        <div className='text-neutral-800 text-xl font-medium '>₩ 25,000</div>
        <button
          className={`px-6 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg shadow text-white font-bold ${
            onToggle && 'hidden'
          }`}
          onClick={() => toggleHandler()}
        >
          Select
        </button>
      </div>

      {onToggle && (
        <div className='relative'>
          <div className='mt-2 pt-4 text-gray-800 text-2xl border-t font-bold'>
            Select date & quantity
          </div>
          <div className='flex flex-wrap gap-x-6 gap-y-3 justify-center mt-2'>
            <div className='flex grow justify-center'>
              <div className='text-neutral-500 text-lg font-light absolute left-0 top-16'>
                Please select an experience date
              </div>
              <Calendar
                className='mt-[32px] grow max-w-[340px]'
                value={selectedDate}
                onChange={setSelectedDate}
                locale='en'
                calendarType='islamic'
                prev2Label={null}
                next2Label={null}
                tileDisabled={({ date }) => isDateDisabled(date)}
              />
            </div>
            <div className='flex flex-col grow justify-between'>
              <div className='flex flex-col'>
                <div className='text-neutral-500 text-lg font-light'>Select quantity</div>
                <div className='flex justify-between py-2 border-b h-12 items-end'>
                  <div className='text-neutral-700'>Per luggage</div>
                  <div className='text-center w-24 text-black text-base font-medium'>
                    {selectedDate ? `₩ ${(25000 * quantity).toLocaleString('ko-KR')}` : ''}
                  </div>
                  <div className='flex items-center w-28 justify-between'>
                    <button
                      className={`w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-[5px] shadow ${
                        !selectedDate && 'opacity-50'
                      }`}
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <span className={`px-4 font-medium ${!selectedDate && 'opacity-50'}`}>
                      {quantity}
                    </span>
                    <button
                      className={`w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-[5px] shadow ${
                        !selectedDate && 'opacity-50'
                      }`}
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                className='mt-3 py-2 bg-blue-700 hover:bg-blue-800 rounded-xl shadow text-white text-lg font-bold'
                onClick={handleNextPage}
              >
                Book now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageOption;
