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
import { Container } from 'next/app';
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

describe('수입 지출 화면 테스트', () => {
  let store;

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

  it('달력이 제대로 나오는지 테스트', () => {
    const nowYear = new Date().getFullYear();
    const nowMonth = new Date().getMonth() + 1;
    const datesWithDays = makeDatesWithDays({ year: nowYear, month: nowMonth });

    const Component = render(
      <Provider store={store}>
        <MockTheme>
          <CalendarBox changeYearAndMonth={changeYearAndMonth} datesWithDays={datesWithDays} setDatesWithDays={setDatesWithDays} yearAndMonth={yearAndMonth} />
        </MockTheme>
      </Provider>
    );

    // expect(screen.getByText('수입: 10000000')).toBeInTheDocument();
    // expect(screen.getByText('지출: 2000')).toBeInTheDocument();
    // expect(screen.getByText('지출: 1000')).toBeInTheDocument();
    // expect(screen.getByText('지출: 3000')).toBeInTheDocument();
    // expect(screen.getByText('지출: 5000')).toBeInTheDocument();
    // expect(screen.getByText('지출: 3000')).toBeInTheDocument();
    // expect(screen.getByText('지출: 4000')).toBeInTheDocument();
    // expect(screen.getByText('지출: 20000')).toBeInTheDocument();
    const { rerender } = Component;

    const DateInput = Component.getByTestId('dateInput') as HTMLInputElement;
    screen.getByTestId('beforeMonthButton').click();
    rerender(
      <Provider store={store}>
        <MockTheme>
          <CalendarBox changeYearAndMonth={changeYearAndMonth} datesWithDays={datesWithDays} setDatesWithDays={setDatesWithDays} yearAndMonth={yearAndMonth} />
        </MockTheme>
      </Provider>
    );

    expect(DateInput.value).toBe(`${nowYear}-${nowMonth - 1}`);
  });
});
