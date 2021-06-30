import React, { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { DateSelectCalendar, IDateSelectCalendar } from './DateSelectCalendar';
import { makeDatesWithDays, changeNumberForm } from '@/src/utils/index';

export default {
  title: 'organisms/DateSelectCalendar',
  component: DateSelectCalendar,
  argTypes: {},
} as Meta;

const Template: Story<IDateSelectCalendar> = () => {
  const [yearAndMonth, setYearAndMonth] = useState<{ year: number; month: number }>({ year: 2021, month: 6 });
  const [datesWithDays, setDatesWithDays] = useState<{ yearAndMonth: string; date: number; day: number; thisMonth: boolean }[][]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('2021-06-30');
  const [calnedarVisible, setCalendarVisible] = useState<boolean>(false);
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
  const onDateClick = (e: string) => {
    const sliceByBar = e.split('-');
    const year = sliceByBar[0];
    const month = sliceByBar[1].length === 1 ? '0' + sliceByBar[1] : sliceByBar[1];
    const date = sliceByBar[2].length === 1 ? '0' + sliceByBar[2] : sliceByBar[2];
    setSelectedDate(`${year}-${month}-${date}`);
    setCalendarVisible(!calnedarVisible);
  };

  const changeCalendarVisible = () => {
    setCalendarVisible(!calnedarVisible);
  };

  const closeModal = () => {
    setCalendarVisible(false);
  };

  return (
    <DateSelectCalendar
      calendarVisible={calnedarVisible}
      selectedDate={selectedDate}
      changeCalendarVisible={changeCalendarVisible}
      buttonType="changeMonthButton"
      datesWithDays={datesWithDays}
      inputType="dateInput"
      leftArrowOnClick={() => changeYearAndMonth({ upOrDown: 'down' })}
      onDateClick={(e) => onDateClick(e)}
      readOnly={true}
      rightArrowOnClick={() => changeYearAndMonth({ upOrDown: 'up' })}
      spanType="calendarDate"
      text={`${yearAndMonth.year}-${yearAndMonth.month}`}
      thisYearAndMonth={`${yearAndMonth.year}-${yearAndMonth.month}`}
      beforeCalendar=""
      nextCalendar=""
      monthIncomeAndExpenditureVisible={false}
      dateSelectCalendar={true}
      closeModal={closeModal}
    />
  );
};

export const CalendarTest = Template.bind({});
