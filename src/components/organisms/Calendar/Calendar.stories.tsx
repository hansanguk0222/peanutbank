import React, { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { Calendar, CalendarProps } from './Calendar';
import { makeDatesWithDays, changeNumberForm } from '@/src/utils/index';
import { accountBook } from '@/src/__test__/__feature__';

export default {
  title: 'organisms/Calendar',
  component: Calendar,
  argTypes: {},
} as Meta;

const Template: Story<CalendarProps> = () => {
  const [yearAndMonth, setYearAndMonth] = useState<{ year: number; month: number }>({ year: 2021, month: 6 });
  const [datesWithDays, setDatesWithDays] = useState<{ date: number; day: number; thisMonth: boolean }[][]>([]);
  useEffect(() => {
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
    <Calendar
      buttonType="changeMonthButton"
      datesWithDays={datesWithDays}
      inputType="dateInput"
      leftArrowOnClick={() => changeYearAndMonth({ upOrDown: 'down' })}
      onDateClick={() => {}}
      readOnly={true}
      rightArrowOnClick={() => changeYearAndMonth({ upOrDown: 'up' })}
      spanType="calendarDate"
      text={`${yearAndMonth.year}-${yearAndMonth.month}`}
      beforeCalendar={''}
      nextCalendar={''}
      incomeLabel={changeNumberForm(10000)}
      expenditureLabel={changeNumberForm(500)}
      accountBook={accountBook}
    />
  );
};

export const CalendarTest = Template.bind({});
