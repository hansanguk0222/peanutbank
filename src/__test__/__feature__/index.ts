import { IAccountBook, ICategory } from '@/src/type/store';

export const maxIncome = 1000000;
export const maxExpenditure = 5000;
export const allIncome = 1350000;
export const allExpenditure = 15000;

export const accountBook: IAccountBook = {
  '2021-5': {
    expenditure: {
      30: [{ id: 'abc124', description: '햄버거', categoryId: 'l', amount: 4500 }],
    },
    income: {
      30: [{ id: 'abc9', description: '알바비', categoryId: 'm', amount: 800000 }],
    },
    allExpenditure: 4500,
    allIncome: 800000,
    maxExpenditure: 4500,
    maxIncome: 800000,
  },
  '2021-6': {
    expenditure: {
      1: [
        { id: 'abc1', description: '담배', categoryId: 'l', amount: 4500 },
        { id: 'abc3', description: '청국장', categoryId: 'a', amount: 5000 },
      ],
      2: [
        { id: 'abc4', description: '당구비', categoryId: 'c', amount: 5000 },
        { id: 'abc5', description: '박카스', categoryId: 'a', amount: 500 },
      ],
    },
    income: {
      15: [{ id: 'abc2', description: '월급', categoryId: 'm', amount: 1000000 }],
      16: [{ id: 'abc6', description: '보너스', categoryId: 'm', amount: 250000 }],
      30: [{ id: 'abc9', description: '밀린 월급', categoryId: 'm', amount: 100000 }],
    },
    allExpenditure,
    allIncome,
    maxExpenditure,
    maxIncome,
  },
  '2021-7': {
    expenditure: {
      1: [{ id: 'abc1', description: '고기', categoryId: 'a', amount: 30000 }],
    },
    income: {},
    allExpenditure: 30000,
    allIncome: 0,
    maxExpenditure: 30000,
    maxIncome: 0,
  },
};

export const categories: ICategory[] = [
  {
    id: 'a',
    name: '식비',
    color: '#32a421',
  },
  {
    id: 'b',
    name: '교통/차량',
    color: '#32a421',
  },
  {
    id: 'c',
    name: '문화생활',
    color: '#56cd2e',
  },
  {
    id: 'd',
    name: '마트/편의점',
    color: '#32a421',
  },
  {
    id: 'e',
    name: '패션/미용',
    color: '#32a421',
  },
  {
    id: 'f',
    name: '생활용품',
    color: '#32a421',
  },
  {
    id: 'g',
    name: '주거/통신',
    color: '#32a421',
  },
  {
    id: 'h',
    name: '건강',
    color: '#32a421',
  },
  {
    id: 'i',
    name: '교육',
    color: '#32a421',
  },
  {
    id: 'j',
    name: '경조사/회비',
    color: '#32a421',
  },
  {
    id: 'k',
    name: '부모님',
    color: '#32a421',
  },
  {
    id: 'l',
    name: '기타',
    color: '#32a421',
  },
  {
    id: 'm',
    name: '현금',
    color: '#32a421',
  },
  {
    id: 'n',
    name: '은행',
    color: '#32a421',
  },
  {
    id: 'o',
    name: '신한카드',
    color: '#32a421',
  },
];
