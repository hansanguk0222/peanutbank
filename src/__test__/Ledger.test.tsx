/* eslint-disable @typescript-eslint/no-empty-function */
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/src/styles/theme';
import { Provider } from 'react-redux';
import { makeStore } from '@/src/store';
import userEvent from '@testing-library/user-event';
import { getCategory } from '@/src/store/sagas/category.saga';
import LedgerFormBox from '@/src/components/container/LedgerFormBox';
import { getCategoryRequest, getCategorySuccess } from '../store/slices/category.slice';
import { accountBookService, categoryService } from '../services';
import { put, call } from 'redux-saga/effects';
import { categorys, accountBook } from './__feature__';
import { createLedger, getAccountBook } from '../store/sagas/accountBook.saga';
import { createLedgerRequest, createLedgerSuccess, getAccountBookSuccess } from '../store/slices/accountBook.slice';

configure({ adapter: new Adapter() });

describe('장부 컴포넌트 테스트', () => {
  let store;
  let calendarVisible = true;
  const setCalendarVisible = () => {
    calendarVisible = !calendarVisible;
  };
  beforeEach(() => {
    store = makeStore();
  });

  it('장부 새로 작성하기', () => {
    const iterator = getCategory(getCategoryRequest({ userId: 'abc' }));
    expect(iterator.next().value).toEqual(call(categoryService.getCategory, { userId: 'abc' }));
    expect(iterator.next({ status: 200, data: categorys }).value).toEqual(put(getCategorySuccess({ status: 200, categorys })));
    expect(iterator.next().done).toBeTruthy();
    store.dispatch(getCategorySuccess({ status: 200, categorys }));

    const Component = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <LedgerFormBox calendarVisible={calendarVisible} yyyy="2021" mm="06" dd="30" setCalendarVisible={setCalendarVisible} />
        </Provider>
      </ThemeProvider>
    );

    screen.getByText('지출').click();
    userEvent.type(screen.getByTestId('inputCategory'), '식비');
    userEvent.type(screen.getByTestId('inputAmount'), '150000');
    userEvent.type(screen.getByTestId('inputDiscription'), '소고기 먹음');

    const InputCategory = Component.getByTestId('inputCategory') as HTMLInputElement;
    const InputAmount = Component.getByTestId('inputAmount') as HTMLInputElement;
    const InputDiscription = Component.getByTestId('inputDiscription') as HTMLInputElement;

    expect(screen.getByText('2021-06-30')).toBeInTheDocument();
    expect(InputCategory.value).toBe('식비');
    expect(InputAmount.value).toBe('150,000');
    expect(InputDiscription.value).toBe('소고기 먹음');

    screen.getByText('제출').click();

    const newIterator = createLedger(createLedgerRequest({ userId: 'abc', amount: 150000, category: '식비', date: '2021-06-30', discription: '소고기 먹음', incomeOrExpenditure: 'expenditure' }));
    expect(newIterator.next().value).toEqual(
      call(accountBookService.createLedger, { userId: 'abc', amount: 150000, category: '식비', date: '2021-06-30', discription: '소고기 먹음', incomeOrExpenditure: 'expenditure' })
    );
    expect(
      newIterator.next({
        status: 201,
        data: {
          amount: 150000,
          categoryId: 'a',
          date: '2021-06-30',
          discription: '소고기 먹음',
          id: 'abcd-12345',
          incomeOrExpenditure: 'expenditure',
          userId: 'abc',
        },
      }).value
    ).toEqual(
      put(createLedgerSuccess({ status: 201, amount: 150000, categoryId: 'a', date: '2021-06-30', discription: '소고기 먹음', id: 'abcd-12345', incomeOrExpenditure: 'expenditure', userId: 'abc' }))
    );
    expect(newIterator.next().done).toBeTruthy();
    store.dispatch(
      createLedgerSuccess({ status: 201, amount: 150000, categoryId: 'a', date: '2021-06-30', discription: '소고기 먹음', id: 'abcd-12345', incomeOrExpenditure: 'expenditure', userId: 'abc' })
    );
    const { rerender } = Component;

    rerender;

    //이거는 모달 안에 이 날의 작성된 장부 목록 아이디인 ledgerList를 가지고 테스트하는 것
    expect(screen.getByTestId('ledgerList').classList.length).toBe(2);
  });
});
