import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
interface IAccountService {
  getAccountBook: (any) => any;
  createLedger: (any) => any;
}

export const accountBookService: IAccountService = {
  getAccountBook({ userId, year, month }: { userId: string; year: number; month: number }) {
    if (process.env.NODE_ENV === 'development') {
      return axios.get(`${process.env.DEV_SERVER_URL}/accountbook?user=${userId}&year=${year}&month=${month}`);
    } else {
      return axios.get(`${process.env.PRO_SERVER_URL}/accountbook?user=${userId}&year=${year}&month=${month}`);
    }
  },
  createLedger({
    userId,
    amount,
    category,
    date,
    discription,
    incomeOrExpenditure,
  }: {
    userId: string;
    date: string;
    incomeOrExpenditure: string;
    amount: number;
    category: string;
    discription: string;
  }) {
    if (process.env.NODE_ENV === 'development') {
      return axios.post(`${process.env.DEV_SERVER_URL}/ledger`, { userId, amount, category, date, discription, incomeOrExpenditure });
    } else if (process.env.NODE_ENV === 'production') {
      return axios.post(`${process.env.PRO_SERVER_URL}/ledger`, { userId, amount, category, date, discription, incomeOrExpenditure });
    }
  },
};
