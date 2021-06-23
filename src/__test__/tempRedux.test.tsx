import { makeStore } from '@/src/store';
// import { plusNum, getJsonDataRequest } from '@/src/store/slices/test.slice';
import { getAccountBookRequest, getAccountBookSuccess } from '@/src/store/slices/accountBook.slice';
import { getAccountBook } from '@/src/store/sagas/accountBook.saga';
import { put, call } from 'redux-saga/effects';
import { accountBookService } from '../services';
import { accountBook } from './__feature__';
import axios from 'axios';
import sagaHelper from 'redux-saga-testing';
import { getPostAPI } from '@/src/store/sagas/accountBook.saga';
jest.mock('axios');

describe('tempRedux', () => {
  const store = makeStore();
  //페이지 띄우자 마자 데이터 패칭 필요한 친구들은 이렇게 구현해야 한다.
  it('사가 연동 없이 숫자 늘리기 테스트', async () => {
    const iterator = getAccountBook(getAccountBookRequest({ userId: 'abc', year: 2021, month: 6 }));
    expect(iterator.next().value).toEqual(call(accountBookService.getAccountBook, { userId: 'abc', year: 2021, month: 6 }));
    expect(iterator.next({ status: 200, data: accountBook }).value).toEqual(put(getAccountBookSuccess({ status: 200, accountBook })));
    expect(iterator.next().done).toBeTruthy();
    store.dispatch(getAccountBookSuccess({ status: 200, accountBook }));
    console.log(store.getState().accountBook);
    expect(store.getState().accountBook);

    // const firstState = store.getState().test;
    // const firstNum = firstState.num;
    // expect(firstNum).toBe(0);
    // store.dispatch(plusNum());
    // const lastState = store.getState().test;
    // const lastNum = lastState.num;
    // expect(lastNum).toBe(1);
    // store.dispatch(getAccountBookRequest({ userId: 'abc', year: 2021, month: 6 }));
    // const tempState = store.getState();
    // console.log(tempState);
  });
});
