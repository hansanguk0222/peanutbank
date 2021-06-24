import React, { useState, useEffect } from 'react';
import { SagaStore, wrapper } from '@/src/store';
import { getAccountBookRequest } from '@/src/store/slices/accountBook.slice';
import CalendarBox from '@/src/components/container/CalendarBox';
import { END } from '@redux-saga/core';

const Calendar: React.FC<{ nowYearAndMonth: { year: number; month: number } }> = ({ nowYearAndMonth }) => {
  const [yearAndMonth, setYearAndMonth] = useState<{ year: number; month: number }>({ year: 0, month: 0 });
  const [datesWithDays, setDatesWithDays] = useState<{ yearAndMonth: string; date: number; day: number; thisMonth: boolean }[][]>([]);
  useEffect(() => {
    console.log(nowYearAndMonth);
    setYearAndMonth(nowYearAndMonth);
  }, [nowYearAndMonth]);

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
  return <CalendarBox changeYearAndMonth={changeYearAndMonth} datesWithDays={datesWithDays} setDatesWithDays={setDatesWithDays} yearAndMonth={yearAndMonth} />;
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {
  const thisYear = Number(query.id.slice(0, 4));
  const thisMonth = Number(query.id.slice(5));
  //여기서는 유저 아이디 받아서 넣는 작업 필요
  // store.dispatch(getAccountBookRequest({ userId: 'abc', year: 2021, month: 6 }));
  store.dispatch(END);

  await (store as SagaStore).sagaTask.toPromise();
  return {
    props: {
      nowYearAndMonth: { year: thisYear, month: thisMonth },
    },
  };
});

export default Calendar;
