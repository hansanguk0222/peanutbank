/**
 * @jest-environment jsdom
 */
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/src/styles/theme';
import { Calendar as UserCalendar } from '@/src/components/organisms/Calendar';
import { makeDatesWithDays } from '@/src/utils';
import CalendarBox from '@/src/components/container/CalendarBox';

configure({ adapter: new Adapter() });

const MockTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe('수입 지출 화면 테스트', () => {
  it('달력이 제대로 나오는지 테스트', () => {
    const nowYear = new Date().getFullYear();
    const nowMonth = new Date().getMonth() + 1;

    const Component = render(
      <MockTheme>
        <CalendarBox />
      </MockTheme>
    );

    const DateInput = Component.getByTestId('dateInput') as HTMLInputElement;

    screen.getByTestId('beforeMonthButton').click();
    expect(DateInput.value).toBe(`${nowYear}-${nowMonth - 1}`);
  });
});
