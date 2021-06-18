export const accountBook = {
  '2021-6': {
    userId: 'abc-1234',
    dates: {
      i: {
        '15': {
          ledgers: [{ id: 7, amount: 10000000, discription: '월급', purpose: 'o' }],
        },
      },
      e: {
        '1': {
          ledgers: [
            { id: 1, amount: 2000, discription: '쭈쭈바', purpose: 'a' },
            { id: 2, amount: 1000, discription: '김밥', purpose: 'a' },
            { id: 3, amount: 3000, discription: '탄산', purpose: 'a' },
          ],
        },
        '3': {
          ledgers: [
            { id: 4, amount: 5000, discription: '국밥', purpose: 'a' },
            { id: 5, amount: 3000, discription: '샴푸', purpose: 'f' },
            { id: 6, amount: 4000, discription: '영화다운로드', purpose: 'c' },
          ],
        },
        '10': {
          ledgers: [{ id: 8, amount: 20000, discription: '피자', purpose: 'a' }],
        },
      },
    },
  },
};

export const maxIncome = 10000000;
export const maxExpenditure = 20000;
export const allIncome = 10000000;
export const allExpenditure = 38000;

export const purpose = [
  {
    id: 'a',
    name: '식비',
  },
  {
    id: 'b',
    name: '교통/차량',
  },
  {
    id: 'c',
    name: '문화생활',
  },
  {
    id: 'd',
    name: '마트/편의점',
  },
  {
    id: 'e',
    name: '패션/미용',
  },
  {
    id: 'f',
    name: '생활용품',
  },
  {
    id: 'g',
    name: '주거/통신',
  },
  {
    id: 'h',
    name: '건강',
  },
  {
    id: 'i',
    name: '교육',
  },
  {
    id: 'j',
    name: '경조사/회비',
  },
  {
    id: 'k',
    name: '부모님',
  },
  {
    id: 'l',
    name: '기타',
  },
  {
    id: 'm',
    name: '현금',
  },
  {
    id: 'n',
    name: '은행',
  },
  {
    id: 'o',
    name: '신한카드',
  },
];
