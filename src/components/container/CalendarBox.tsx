import React, { useEffect, useState } from 'react';
import { Calendar as UserCalendar } from '@/src/components/organisms/Calendar';
import { changeNumberForm, findBeforeAndNextYearAndMonth, makeDatesWithDays } from '@/src/utils';
import { useAccountBookState } from '@/src/hooks';
import LedgerFormBox from './LedgerFormBox';

const CalendarBox: React.FC<{
  yearAndMonth: { year: number; month: number };
  datesWithDays: { yearAndMonth: string; date: number; day: number; thisMonth: boolean }[][];
  setDatesWithDays: (datesWithDays: { yearAndMonth: string; date: number; day: number; thisMonth: boolean }[][]) => void;
  changeYearAndMonth: ({ upOrDown }: { upOrDown: 'up' | 'down' }) => void;
}> = ({
  yearAndMonth,
  datesWithDays,
  setDatesWithDays,
  changeYearAndMonth,
}: {
  yearAndMonth: { year: number; month: number };
  datesWithDays: { yearAndMonth: string; date: number; day: number; thisMonth: boolean }[][];
  setDatesWithDays: (datesWithDays: { yearAndMonth: string; date: number; day: number; thisMonth: boolean }[][]) => void;
  changeYearAndMonth: ({ upOrDown }: { upOrDown: 'up' | 'down' }) => void;
}) => {
  const [beforeCalendar, setBeforeCalendar] = useState<string>('');
  const [nextCalendar, setNextCalendar] = useState<string>('');
  const { accountBook } = useAccountBookState();
  const [expenditureLabel, setExpenditureLabel] = useState<number>(0);
  const [incomeLabel, setIncomeLabel] = useState<number>(0);

  useEffect(() => {
    if (accountBook[`${yearAndMonth.year}-${yearAndMonth.month}`] !== undefined) {
      setExpenditureLabel(accountBook[`${yearAndMonth.year}-${yearAndMonth.month}`].allExpenditure);
      setIncomeLabel(accountBook[`${yearAndMonth.year}-${yearAndMonth.month}`].allIncome);
    }
  }, [yearAndMonth, accountBook]);

  useEffect(() => {
    const { year, month } = yearAndMonth;
    setDatesWithDays(makeDatesWithDays({ year, month }));
    const { lastMonth, lastYear, nextMonth, nextYear } = findBeforeAndNextYearAndMonth({ year, month });
    setBeforeCalendar(`${lastYear}-${lastMonth}`);
    setNextCalendar(`${nextYear}-${nextMonth}`);
  }, [yearAndMonth]);

  //모달로 장부 작성하는 거 띄워야 함!
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
      accountBook={accountBook}
      expenditureLabel={changeNumberForm(expenditureLabel)}
      incomeLabel={changeNumberForm(incomeLabel)}
      thisYearAndMonth={`${yearAndMonth.year}-${yearAndMonth.month}`}
      monthIncomeAndExpenditureVisible={true}
    />
  );
};

export default CalendarBox;
