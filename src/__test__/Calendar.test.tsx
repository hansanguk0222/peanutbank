/* eslint-disable @typescript-eslint/no-empty-function */
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/src/styles/theme';
import CalendarBox from '@/src/components/container/CalendarBox';
import { Provider } from 'react-redux';
import { makeStore } from '@/src/store';
import { makeDatesWithDays } from '@/src/utils';
import { getAccountBookRequest, getAccountBookSuccess } from '@/src/store/slices/accountBook.slice';
import { getAccountBook } from '@/src/store/sagas/accountBook.saga';
import { put, call } from 'redux-saga/effects';
import { accountBookService } from '../services';
import { accountBook } from './__feature__';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { MonthIncomeAndExpenditureText } from '@/src/utils/constants';

configure({ adapter: new Adapter() });

const MockTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

jest.mock(
  'next/link',
  () =>
    ({ children }) =>
      children
);

describe('달력 컴포넌트 테스트', () => {
  let store;

  const thisMonthIncome = '1,350,000';
  const thisMonthExpenditure = '15,000';
  const beforeMonthIncome = '800,000';
  const beforeMonthExpenditure = '4,500';

  const setDatesWithDays = (
    newState: {
      date: number;
      day: number;
      thisMonth: boolean;
    }[][]
  ) =>
    jest.fn().mockImplementation(
      (
        state: {
          date: number;
          day: number;
          thisMonth: boolean;
        }[][]
      ) => [
        newState,
        (
          newState: {
            date: number;
            day: number;
            thisMonth: boolean;
          }[][]
        ) => {},
      ]
    );

  let yearAndMonth = { year: 2021, month: 6 };

  const changeYearAndMonth = jest.fn().mockImplementation(({ upOrDown }) => {
    if (upOrDown === 'down') {
      if (yearAndMonth.month === 1) {
        yearAndMonth = { year: yearAndMonth.year - 1, month: 12 };
      } else {
        yearAndMonth = { ...yearAndMonth, month: yearAndMonth.month - 1 };
      }
    } else {
      if (yearAndMonth.month === 12) {
        yearAndMonth = { year: yearAndMonth.year + 1, month: 1 };
      } else {
        yearAndMonth = { ...yearAndMonth, month: yearAndMonth.month + 1 };
      }
    }
  });

  beforeEach(() => {
    store = makeStore();
  });

  it('처음 달력화면 진입시 달력이 제대로 나오는지 테스트', async () => {
    const nowYear = 2021;
    const nowMonth = 6;
    const datesWithDays = makeDatesWithDays({ year: nowYear, month: nowMonth });

    const iterator = getAccountBook(getAccountBookRequest({ userId: 'abc', year: 2021, month: 6 }));
    expect(iterator.next().value).toEqual(call(accountBookService.getAccountBook, { userId: 'abc', year: 2021, month: 6 }));
    expect(iterator.next({ status: 200, data: accountBook }).value).toEqual(put(getAccountBookSuccess({ status: 200, accountBook })));
    expect(iterator.next().done).toBeTruthy();
    store.dispatch(getAccountBookSuccess({ status: 200, accountBook }));

    const Component = render(
      <Provider store={store}>
        <MockTheme>
          <CalendarBox changeYearAndMonth={changeYearAndMonth} datesWithDays={datesWithDays} setDatesWithDays={setDatesWithDays} yearAndMonth={yearAndMonth} />
        </MockTheme>
      </Provider>
    );

    const DateInput = Component.getByTestId('dateInput') as HTMLInputElement;

    expect(screen.getByText(`${MonthIncomeAndExpenditureText.INCOME}: ${thisMonthIncome}`)).toBeInTheDocument();
    expect(screen.getByText(`${MonthIncomeAndExpenditureText.EXPENDITURE}: ${thisMonthExpenditure}`)).toBeInTheDocument();
    expect(screen.getByText('4,500')).toBeInTheDocument();
    expect(screen.getByText('800,000')).toBeInTheDocument();
    expect(screen.getByText('9,500')).toBeInTheDocument();
    expect(screen.getByText('5,500')).toBeInTheDocument();
    expect(screen.getByText('1,000,000')).toBeInTheDocument();
    expect(screen.getByText('250,000')).toBeInTheDocument();
    expect(screen.getByText('100,000')).toBeInTheDocument();
    expect(screen.getByText('30,000')).toBeInTheDocument();
    expect(DateInput.value).toBe(`${nowYear}-${nowMonth}`);

    //달력 버튼 잘 동작하는지 테스트
    const { rerender } = Component;

    const BeforeDateInput = Component.getByTestId('dateInput') as HTMLInputElement;
    screen.getByTestId('beforeMonthButton').click();

    rerender(
      <Provider store={store}>
        <MockTheme>
          <CalendarBox changeYearAndMonth={changeYearAndMonth} datesWithDays={datesWithDays} setDatesWithDays={setDatesWithDays} yearAndMonth={yearAndMonth} />
        </MockTheme>
      </Provider>
    );

    expect(screen.getByText(`${MonthIncomeAndExpenditureText.INCOME}: ${beforeMonthIncome}`)).toBeInTheDocument();
    expect(screen.getByText(`${MonthIncomeAndExpenditureText.EXPENDITURE}: ${beforeMonthExpenditure}`)).toBeInTheDocument();
    expect(screen.getByText('4,500')).toBeInTheDocument();
    expect(screen.getByText('800,000')).toBeInTheDocument();
    expect(screen.getByText('9,500')).toBeInTheDocument();
    expect(screen.getByText('5,500')).toBeInTheDocument();
    expect(BeforeDateInput.value).toBe(`${nowYear}-${nowMonth - 1}`);
  });
});
