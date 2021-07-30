import React, { useCallback, useEffect, useState } from 'react';
import { Calendar as UserCalendar } from '@/src/components/organisms/Calendar';
import { changeNumberForm, findBeforeAndNextYearAndMonth, makeDatesWithDays } from '@/src/utils';
import { useAccountBookState } from '@/src/hooks';
import LedgerFormBox from './LedgerFormBox';
import Modal from 'react-modal';
import { calcRem } from '@/src/styles/theme';

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
  const { accountBookInfo } = useAccountBookState();
  const [expenditureLabel, setExpenditureLabel] = useState<number>(0);
  const [incomeLabel, setIncomeLabel] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [yyyymmdd, setYyyymmdd] = useState<{ yyyy: string; mm: string; dd: string }>();
  const [calendarVisible, setCalendarVisible] = useState(false);

  useEffect(() => {
    if (accountBookInfo !== null && accountBookInfo[`${yearAndMonth.year}-${yearAndMonth.month}`] !== undefined) {
      setExpenditureLabel(accountBookInfo[`${yearAndMonth.year}-${yearAndMonth.month}`].allExpenditure);
      setIncomeLabel(accountBookInfo[`${yearAndMonth.year}-${yearAndMonth.month}`].allIncome);
    }
  }, [yearAndMonth, accountBookInfo]);

  useEffect(() => {
    const { year, month } = yearAndMonth;
    setDatesWithDays(makeDatesWithDays({ year, month }));
    const { lastMonth, lastYear, nextMonth, nextYear } = findBeforeAndNextYearAndMonth({ year, month });
    setBeforeCalendar(`${lastYear}-${lastMonth}`);
    setNextCalendar(`${nextYear}-${nextMonth}`);
  }, [yearAndMonth]);

  const onDateClick = useCallback((e) => {
    const temp = e.split('-');
    const yyyy = temp[0];
    const mm = temp[1];
    const dd = temp[2];
    setIsOpen(true);
    setYyyymmdd({ yyyy, mm, dd });
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { background: 'rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '100%', height: '100%' },
          content: {
            background: 'none',
            border: 'none',
            width: `${calcRem(550)}`,
            height: `${calcRem(500)}`,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <LedgerFormBox yyyymmdd={yyyymmdd} calendarVisible={calendarVisible} setCalendarVisible={setCalendarVisible} />
      </Modal>
      <UserCalendar
        buttonType="changeMonthButton"
        datesWithDays={datesWithDays}
        inputType="dateInput"
        onDateClick={onDateClick}
        leftArrowOnClick={() => changeYearAndMonth({ upOrDown: 'down' })}
        rightArrowOnClick={() => changeYearAndMonth({ upOrDown: 'up' })}
        readOnly
        spanType="calendarDate"
        text={`${yearAndMonth.year}-${yearAndMonth.month}`}
        beforeCalendar={beforeCalendar}
        nextCalendar={nextCalendar}
        accountBook={accountBookInfo}
        expenditureLabel={changeNumberForm(expenditureLabel)}
        incomeLabel={changeNumberForm(incomeLabel)}
        thisYearAndMonth={`${yearAndMonth.year}-${yearAndMonth.month}`}
        monthIncomeAndExpenditureVisible={true}
      />
    </>
  );
};

export default CalendarBox;
