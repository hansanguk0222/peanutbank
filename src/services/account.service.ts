import axios from 'axios';
interface IAccountService {
  getAccountBook: (any) => any;
  createLedger: (any) => any;
}

export const accountBookService: IAccountService = {
  getAccountBook({ userId, year, month }: { userId: string; year: number; month: number }) {
    if (process.env.NODE_ENV === 'development') {
      return axios.get(`${process.env.DEV_SERVER_URL}/accountbooks?user=${userId}&year=${year}&month=${month}`);
    } else {
      return axios.get(`${process.env.PRO_SERVER_URL}/accountbooks?user=${userId}&year=${year}&month=${month}`);
    }
  },
  createLedger({
    userId,
    amount,
    category,
    date,
    description,
    incomeOrExpenditure,
  }: {
    userId: string;
    date: string;
    incomeOrExpenditure: string;
    amount: number;
    category: string;
    description: string;
  }) {
    if (process.env.NODE_ENV === 'development') {
      return axios.post(`${process.env.DEV_SERVER_URL}/ledger`, { userId, amount, category, date, description, incomeOrExpenditure });
    } else if (process.env.NODE_ENV === 'production') {
      return axios.post(`${process.env.PRO_SERVER_URL}/ledger`, { userId, amount, category, date, description, incomeOrExpenditure });
    }
  },
};
