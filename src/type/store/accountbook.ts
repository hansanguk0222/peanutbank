import { Status } from '@/src/utils/constants';

interface Iledge {
  id: string;
  discription: string;
  purpose: string;
  amount: number;
}

export interface IAccountBook {
  [yearAndMonth: string]: {
    income: {
      [date: number]: Iledge[];
    };
    expenditure: {
      [date: number]: Iledge[];
    };
    maxIncome: number;
    maxExpenditure: number;
    allIncome: number;
    allExpenditure: number;
  };
}
export interface IAccountBookState {
  accountBook: IAccountBook | null;
  loading: boolean;
  errMessage: null | string;
  status: typeof Status | null;
}
