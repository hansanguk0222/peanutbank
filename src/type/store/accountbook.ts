import { Status } from '@/src/utils/constants';

export interface ILedger {
  id?: string;
  date?: string;
  incomeOrExpenditure?: string;
  description: string;
  categoryId: string;
  amount: number;
}

export interface IAccountBook {
  [yearAndMonth: string]: {
    income: {
      [date: number]: ILedger[];
    };
    expenditure: {
      [date: number]: ILedger[];
    };
    maxIncome: number;
    maxExpenditure: number;
    allIncome: number;
    allExpenditure: number;
  };
}
export interface IAccountBookState {
  accountBookInfo: IAccountBook | null;
  loading: boolean;
  errMessage: null | string;
  status: typeof Status | null;
}
