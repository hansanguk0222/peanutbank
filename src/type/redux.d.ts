import { Task } from '@redux-saga/types';
import * as Redux from 'redux';

declare module 'redux' {
  export interface Store {
    sagaTask: Task;
  }
}
