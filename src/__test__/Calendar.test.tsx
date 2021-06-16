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
configure({ adapter: new Adapter() });

const MockTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const changeYearAndMonth = jest.fn();

describe('수입 지출 화면 테스트', () => {
  it('달력이 제대로 나오는지 테스트', () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    const datesWithDays = makeDatesWithDays({ year, month });

    render(
      <MockTheme>
        <UserCalendar
          buttonType="changeMonthButton"
          datesWithDays={datesWithDays}
          inputType="dateInput"
          onDateClick={() => {}}
          leftArrowOnClick={() => changeYearAndMonth({ upOrDown: 'down' })}
          rightArrowOnClick={() => changeYearAndMonth({ upOrDown: 'up' })}
          readOnly
          spanType="calendarDate"
          text={`${year}-${month}`}
        />
      </MockTheme>
    );
  });
});
