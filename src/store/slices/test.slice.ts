import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

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
    getJsonDataRequest(state, { payload }: PayloadAction<{ num: number }>) {
      state.jsonData.loading = false;
      state.jsonData.res = [];
      state.jsonData.err = null;
    },
    getJsonDataSuccess(state, { payload }: PayloadAction<{ res: any }>) {
      const { res } = payload;
      state.jsonData.loading = false;
      state.jsonData.res = res;
    },
    getJsonDataFailure(state, { payload }: PayloadAction<{ err: AxiosError }>) {
      const { err } = payload;
      state.jsonData.loading = false;
      state.jsonData.err = err;
    },
    updateJsonDataRequest(
      state,
      { payload }: PayloadAction<{ id: number; title: string; body: string; userId: number }>
    ) {
      state.jsonData.loading = false;
      state.jsonData.res = [];
      state.jsonData.err = null;
    },
    updateJsonDataSuccess(
      state,
      { payload }: PayloadAction<{ id: number; title: string; body: string; userId: number }>
    ) {
      const { id, title, body, userId } = payload;
      state.jsonData.res = { id, title, body, userId };
      state.jsonData.err = null;
    },
    updateJsonDataFailure(state, { payload }: PayloadAction<{ err: AxiosError }>) {
      const { err } = payload;
      state.jsonData.loading = false;
      state.jsonData.err = err;
    },
  },
});

export const TEST = testSlice.name;
export const {
  getJsonDataRequest,
  getJsonDataSuccess,
  getJsonDataFailure,
  updateJsonDataRequest,
  updateJsonDataSuccess,
  updateJsonDataFailure,
} = testSlice.actions;

export default testSlice.reducer;
