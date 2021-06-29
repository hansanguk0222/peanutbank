import styled from 'styled-components';
import { Span } from '@/src/components/atoms/Span';
import { MonthIncomeAndExpenditureText } from '@/src/utils/constants';
import { calcRem } from '@/src/styles/theme';

export interface MonthIncomeAndExpenditureProps {
  incomeLabel?: string;
  expenditureLabel?: string;
}

const Container = styled.div`
  position: absolute;
  right: ${calcRem(10)};
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 1px solid green;
`;

export const MonthIncomeAndExpenditure: React.FC<MonthIncomeAndExpenditureProps> = ({ expenditureLabel, incomeLabel }) => {
  return (
    <Container>
      <Span spanType="showMonthIncomeAndExpenditure" incomeOrExpenditure="income" notThisMonth>
        {MonthIncomeAndExpenditureText.INCOME}: {incomeLabel}
      </Span>
      <Span spanType="showMonthIncomeAndExpenditure" incomeOrExpenditure="expenditure" notThisMonth>
        {MonthIncomeAndExpenditureText.EXPENDITURE}: {expenditureLabel}
      </Span>
    </Container>
  );
};
