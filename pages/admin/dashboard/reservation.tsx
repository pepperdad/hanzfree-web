import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { getLogginedUser } from '@pages/api';
import Instance from '@pages/api/config';
import Button from '@shared/components/Button';
import InputCalendar from '@shared/components/InputCalendar';

import { Admin } from '.';

interface Reservation {
  id: number;
  date: string;
  method: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  // 예약과 관련된 다른 필드들 추가
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const reservation = () => {
  const initialFilter = {
    date: { start: undefined, end: undefined },
    showCalendar: { start: false, end: false },
    method: '전체',
  };

  const router = useRouter();
  const [admin, setAdmin] = useState<Admin>();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    getLogginedUser()
      .then((res) => {
        setAdmin(res.data);
      })
      .catch(() => {
        router.push('/admin');
      });

    Instance.get('/reservation')
      .then((res) => {
        setReservations(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handleCalendarClick = (type: 'start' | 'end') => {
    setFilter((prev) => ({
      ...prev,
      showCalendar: {
        ...prev.showCalendar,
        start: type === 'start' ? !prev.showCalendar.start : prev.showCalendar.start,
        end: type === 'end' ? !prev.showCalendar.end : prev.showCalendar.end,
      },
    }));
  };

  const handleDateChange = (type: 'start' | 'end', newDate: Date) => {
    const { start, end } = filter.date;

    if (type === 'start' && end && newDate.getTime() > new Date(end).getTime()) {
      alert('시작 날짜는 종료 날짜보다 늦을 수 없습니다.');
      return;
    }

    if (type === 'end' && start && newDate.getTime() < new Date(start).getTime()) {
      alert('종료 날짜는 시작 날짜보다 이전일 수 없습니다.');
      return;
    }

    setFilter((prevFilter) => ({
      ...prevFilter,
      date: {
        ...prevFilter.date,
        [type]: newDate,
      },
    }));

    handleCalendarClick(type);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleFitler = () => {
    Instance.get('/reservation', {
      params: {
        startDate: filter.date.start,
        endDate: filter.date.end,
        method: filter.method === '전체' ? undefined : filter.method,
      },
    })
      .then((res) => {
        setReservations(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <header className='bg-gray-800 text-white p-4'>
        <div className='container mx-auto'>
          <h1 className='text-2xl font-bold'>예약 관리</h1>
          <Link href='/admin/dashboard'>
            <a className='text-blue-300 hover:text-blue-500 ml-4'>뒤로가기</a>
          </Link>
        </div>
      </header>
      <div className='container mx-auto p-4'>
        <div className='md:flex justify-between'>
          <h1 className='md:text-2xl font-bold mb-4'>전체 예약 목록</h1>
          <div className='md:flex gap-4 items-center'>
            <InputCalendar
              date={filter.date.start}
              visible={filter.showCalendar.start}
              placeholder='시작일'
              handleCalendarClick={() => handleCalendarClick('start')}
              handleDateChange={(e) => {
                handleDateChange('start', e);
              }}
            />
            <InputCalendar
              date={filter.date.end}
              visible={filter.showCalendar.end}
              placeholder='종료일'
              handleCalendarClick={() => handleCalendarClick('end')}
              handleDateChange={(e) => {
                handleDateChange('end', e);
              }}
            />
            <select
              className='w-[140px] h-[38px] bg-white rounded-[5px] border border-neutral-200 relative cursor-pointer'
              value={filter.method}
              name='method'
              onChange={handleSelectChange}
            >
              <option>전체</option>
              <option>airport to hotel</option>
              <option>hotel to airport</option>
            </select>
            <Button onClick={handleFitler}>검색</Button>
          </div>
        </div>
        <table className='min-w-full border border-gray-300'>
          <thead>
            <tr>
              <th className='border border-gray-300 px-4 py-2'>ID</th>
              <th className='border border-gray-300 px-4 py-2'>예약 날짜</th>
              <th className='border border-gray-300 px-4 py-2'>method</th>
              <th className='border border-gray-300 px-4 py-2'>예약자 명</th>
              <th className='border border-gray-300 px-4 py-2'>신청 날짜</th>
              {/* 예약과 관련된 다른 필드에 따라 필요한 만큼 th를 추가하세요 */}
            </tr>
          </thead>
          <tbody>
            {reservations?.map((_reservation: Reservation) => (
              <tr key={_reservation.id}>
                <td className='border border-gray-300 px-4 py-2'>{_reservation.id}</td>
                <td className='border border-gray-300 px-4 py-2'>
                  {_reservation?.date?.slice(0, 10)}
                </td>
                <td className='border border-gray-300 px-4 py-2'>{_reservation.method}</td>
                <td className='border border-gray-300 px-4 py-2'>
                  {_reservation.firstName} {_reservation.lastName}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {_reservation?.createdAt?.slice(0, 10)}
                </td>
                {/* 예약과 관련된 다른 필드에 따라 필요한 만큼 td를 추가하세요 */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default reservation;
