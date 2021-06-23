import axios from 'axios';

interface IAccountService {
  getAccountBook: (any) => any;
  updateJsonData: (any) => any;
  getJsonData: () => any;
}

export const accountBookService: IAccountService = {
  getAccountBook({ userId, year, month }: { userId: string; year: number; month: number }) {
    console.log(userId, year, month);
    return axios.get(`http://localhost:8080/ledger`);
  },
  updateJsonData({ id, userId, body, title }: { id: number; title: string; body: string; userId: number }) {
    return axios.put(`https://jsonplaceholder.typicode.com/posts/11`, { id, userId, body, title });
  },
  getJsonData() {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/11`);
  },
};
