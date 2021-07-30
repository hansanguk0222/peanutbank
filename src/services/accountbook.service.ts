import axios from 'axios';
import API from './API';

interface IAccountService {
  getAccountBook: (any) => any;
  createLedger: ({
    id,
    nickname,
    amount,
    category,
    yyyy,
    mm,
    dd,
    description,
    incomeOrExpenditure,
  }: {
    id?: string;
    nickname: string;
    yyyy: string;
    mm: string;
    dd: string;
    incomeOrExpenditure: string;
    amount: number;
    category: string;
    description: string;
  }) => any;
}

export const accountBookService: IAccountService = {
  getAccountBook({ nickname, yyyy, mm }: { nickname: string; yyyy: number; mm: number }) {
    if (process.env.NODE_ENV === 'development') {
      return API.get(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/accountbooks/users/${nickname}/years/${yyyy}/months/${mm}`);
    } else {
      return API.get(`${process.env.NEXT_PUBLIC_PRO_SERVER_URL}/accountbooks/users/${nickname}/years/${yyyy}/months/${mm}`);
    }
  },
  createLedger({
    id,
    nickname,
    amount,
    category,
    yyyy,
    mm,
    dd,
    description,
    incomeOrExpenditure,
  }: {
    id?: string;
    nickname: string;
    yyyy: string;
    mm: string;
    dd: string;
    incomeOrExpenditure: string;
    amount: number;
    category: string;
    description: string;
  }) {
    if (process.env.NODE_ENV === 'development') {
      return axios.post(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/ledgers`, { id, nickname, amount, category, yyyy, mm, dd, description, incomeOrExpenditure });
    } else if (process.env.NODE_ENV === 'production') {
      return axios.post(`${process.env.NEXT_PUBLIC_PRO_SERVER_URL}/ledgers`, { id, nickname, amount, category, yyyy, mm, dd, description, incomeOrExpenditure });
    }
  },
};
