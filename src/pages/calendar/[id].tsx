import React, { useState } from 'react';
import { SagaStore, wrapper } from '@/src/store';
import { getAccountBookRequest } from '@/src/store/slices/accountBook.slice';
import CalendarBox from '@/src/components/container/CalendarBox';
import { END } from '@redux-saga/core';
import { getCategoryRequest } from '@/src/store/slices/category.slice';

const Calendar: React.FC<{ nowYearAndMonth: { year: number; month: number } }> = ({ nowYearAndMonth }) => {
  const [yearAndMonth, setYearAndMonth] = useState<{ year: number; month: number }>({ year: nowYearAndMonth.year, month: nowYearAndMonth.month });
  const [datesWithDays, setDatesWithDays] = useState<{ yearAndMonth: string; date: number; day: number; thisMonth: boolean }[][]>([]);

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

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, query }) => {
  const thisYear = Number(query.id.slice(0, 4));
  const thisMonth = Number(query.id.slice(5));
  const cookieStr = req.headers.cookie as string;
  const cookies = cookieStr.split(' ');
  let nickname;
  cookies.map((cookie) => {
    if (cookie.startsWith('nickname=')) {
      nickname = cookie.slice(9).replace(/;$/, '');
    }
  });
  store.dispatch(getCategoryRequest({ nickname }));
  store.dispatch(getAccountBookRequest({ nickname, yyyy: thisYear, mm: thisMonth }));
  store.dispatch(END);

  await (store as SagaStore).sagaTask.toPromise();
  return {
    props: {
      nowYearAndMonth: { year: thisYear, month: thisMonth },
    },
  };
});

export default Calendar;
