import React from 'react';
import { Calendar as UserCalendar } from '@/src/components/organisms/Calendar';
import { makeDatesWithDays } from '@/src/utils';

const CalendarBox: React.FC = () => {
  const [yearAndMonth, setYearAndMonth] = React.useState<{ year: number; month: number }>({ year: 2021, month: 6 });
  const [datesWithDays, setDatesWithDays] = React.useState<{ date: number; day: number; thisMonth: boolean }[][]>([]);
  React.useEffect(() => {
    const { year, month } = yearAndMonth;
    setDatesWithDays(makeDatesWithDays({ year, month }));
  }, [yearAndMonth]);
  const changeYearAndMonth: ({ upOrDown }: { upOrDown: 'up' | 'down' }) => void = ({ upOrDown }: { upOrDown: 'up' | 'down' }) => {
    const { year, month } = yearAndMonth;
    if (upOrDown === 'down') {
      if (month === 1) {
        setYearAndMonth({ year: year - 1, month: 12 });
      } else {
        setYearAndMonth({ year, month: month - 1 });
      }
    } else {
      if (month === 12) {
        setYearAndMonth({ year: year + 1, month: 1 });
      } else {
        setYearAndMonth({ year, month: month + 1 });
      }
    }
  };
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
    />
  );
};

export default CalendarBox;
