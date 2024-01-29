import Image from 'next/image';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface InputCalenderProps {
  date?: Date;
  visible: boolean;
  placeholder: string;
  handleCalendarClick: VoidFunction;
  handleDateChange: (newDate: Date) => void;
}

const InputCalender = ({
  date,
  visible,
  placeholder,
  handleCalendarClick,
  handleDateChange,
}: InputCalenderProps) => {
  return (
    <div className='w-[111px] h-[38px] bg-white rounded-[5px] border border-neutral-200 relative cursor-pointer'>
      <div className='h-full flex-center' onClick={handleCalendarClick}>
        <input
          className='w-full px-2 py-1 text-sm font-normal cursor-pointer text-zinc-500 focus:outline-none'
          placeholder={placeholder}
          defaultValue={date?.toLocaleDateString()}
          readOnly
        />
        <div className='pr-2'>
          <Image src='/assets/calendar.svg' alt='calender' width={13} height={13} />
        </div>
      </div>
      {visible && (
        <div className='absolute top-[38px] left-0 z-30'>
          <Calendar value={date} onClickDay={handleDateChange} />
        </div>
      )}
    </div>
  );
};

export default InputCalender;
