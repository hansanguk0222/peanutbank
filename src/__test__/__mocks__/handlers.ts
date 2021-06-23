import { rest } from 'msw';
import { accountBook } from '../__feature__';

export const handlers = [
  rest.post('http://localhost:8080/ledger', (req, res, ctx) => {
    //1. 필요한 정보 다 안 들어오면 400 띄우기
    return res(
      ctx.status(201),
      ctx.json({
        maxIncome: 10000000,
        maxExpenditure: 20000,
        allIncome: 10000000,
        allExpenditure: 45000,
      })
    );
  }),

  rest.patch('http://localhost:8080/ledger', (req, res, ctx) => {
    //1. 필요한 정보 다 안 들어오면 400 띄우기
    return res(
      ctx.status(200),
      ctx.json({
        maxIncome: 10000000,
        maxExpenditure: 20000,
        allIncome: 10000000,
        allExpenditure: 46000,
      })
    );
  }),

  rest.delete('http://localhost:8080/ledger', (req, res, ctx) => {
    //1. 필요한 정보 다 안 들어오면 400 띄우기
    return res(
      ctx.status(200),
      ctx.json({
        maxIncome: 10000000,
        maxExpenditure: 20000,
        allIncome: 10000000,
        allExpenditure: 38000,
      })
    );
  }),

  rest.get('http://localhost:8080/ledger', (req, res, ctx) => {
    //1. 필요한 정보 다 안 들어오면 400 띄우기
    return res(ctx.status(200), ctx.json(accountBook));
  }),
];
