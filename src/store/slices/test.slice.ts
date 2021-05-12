import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '@/src/store/slices';

export interface TestState {
  jsonData: {
    res: any;
    loading: boolean;
    err: null | AxiosError;
  };
}

const testState: TestState = {
  jsonData: {
    res: [],
    loading: false,
    err: null,
  },
};

const testSlice = createSlice({
  name: 'test',
  initialState: testState,
  reducers: {
    jsonDataRequest(state, { payload }: PayloadAction<{ num: number }>) {
      console.log('hihihihihi');
      state.jsonData.loading = false;
      state.jsonData.res = [];
      state.jsonData.err = null;
    },
    jsonDataSuccess(state, { payload }: PayloadAction<{ res: any }>) {
      const { res } = payload;
      state.jsonData.loading = true;
      state.jsonData.res = res;
    },
    jsonDataFailure(state, { payload }: PayloadAction<{ err: AxiosError }>) {
      const { err } = payload;
      state.jsonData.loading = false;
      state.jsonData.err = err;
    },
  },
});

const selectTestState = (state: RootState) => state.test;

export const selectTest = createSelector(selectTestState, (test) => test);
export const TEST = testSlice.name;
export const { jsonDataRequest, jsonDataSuccess, jsonDataFailure } = testSlice.actions;

export default testSlice.reducer;
