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
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';

configure({ adapter: new Adapter() });

describe('장부 컴포넌트 테스트', () => {
  let store;
  beforeEach(() => {
    store = makeStore();
  });

  it('장부 새로 작성하기', () => {
    const Component = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}></Provider>
      </ThemeProvider>
    );

    screen.getByText('지출').click();
    userEvent.type(screen.getByTestId('inputCategory'), '식비');
    userEvent.type(screen.getByTestId('inputAmount'), '150000');
    userEvent.type(screen.getByTestId('inputDiscription'), '소고기 먹음');

    const DateInput = Component.getByTestId('dateInput') as HTMLInputElement;
    const InputCategory = Component.getByTestId('inputCategory') as HTMLInputElement;
    const InputAmount = Component.getByTestId('inputAmount') as HTMLInputElement;
    const InputDiscription = Component.getByTestId('inputDiscription') as HTMLInputElement;

    expect(DateInput.value).toBe('2021-06-30');
    expect(InputCategory.value).toBe('식비');
    expect(InputAmount.value).toBe('150,000');
    expect(InputDiscription.value).toBe('소고기 먹음');

    screen.getByText('제출').click();

    //이거는 모달 안에 이 날의 작성된 장부 목록 아이디인 ledgerList를 가지고 테스트하는 것
    expect(screen.getByTestId('ledgerList').classList.length).toBe(2);
  });
});
