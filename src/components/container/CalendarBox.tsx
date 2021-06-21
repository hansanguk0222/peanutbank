import React, { useEffect, useState } from 'react';
import { Calendar as UserCalendar } from '@/src/components/organisms/Calendar';
import {} from '@/src/store/';
import { findBeforeAndNextYearAndMonth, makeDatesWithDays } from '@/src/utils';

const CalendarBox: React.FC<{
  yearAndMonth: { year: number; month: number };
  datesWithDays: { date: number; day: number; thisMonth: boolean }[][];
  setDatesWithDays: (datesWithDays: { date: number; day: number; thisMonth: boolean }[][]) => void;
  changeYearAndMonth: ({ upOrDown }: { upOrDown: 'up' | 'down' }) => void;
}> = ({
  yearAndMonth,
  datesWithDays,
  setDatesWithDays,
  changeYearAndMonth,
}: {
  yearAndMonth: { year: number; month: number };
  datesWithDays: { date: number; day: number; thisMonth: boolean }[][];
  setDatesWithDays: (datesWithDays: { date: number; day: number; thisMonth: boolean }[][]) => void;
  changeYearAndMonth: ({ upOrDown }: { upOrDown: 'up' | 'down' }) => void;
}) => {
  const [beforeCalendar, setBeforeCalendar] = useState<string>('');
  const [nextCalendar, setNextCalendar] = useState<string>('');

  useEffect(() => {
    const { year, month } = yearAndMonth;
    setDatesWithDays(makeDatesWithDays({ year, month }));
    const { lastMonth, lastYear, nextMonth, nextYear } = findBeforeAndNextYearAndMonth({ year, month });
    setBeforeCalendar(`${lastYear}-${lastMonth}`);
    setNextCalendar(`${nextYear}-${nextMonth}`);
  }, [yearAndMonth]);

  return (
    <UserCalendar
      buttonType="changeMonthButton"
      datesWithDays={datesWithDays}
      inputType="dateInput"
      onDateClick={() => {}}
      leftArrowOnClick={() => changeYearAndMonth({ upOrDown: 'down' })}
      rightArrowOnClick={() => changeYearAndMonth({ upOrDown: 'up' })}
      readOnly
      spanType="calendarDate"
      text={`${yearAndMonth.year}-${yearAndMonth.month}`}
      beforeCalendar={beforeCalendar}
      nextCalendar={nextCalendar}
    />
  );
};

export default CalendarBox;
