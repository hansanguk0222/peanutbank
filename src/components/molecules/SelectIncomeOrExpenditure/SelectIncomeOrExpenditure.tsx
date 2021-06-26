import React from 'react';
import styled, { css } from 'styled-components';
import { Button, ButtonProps } from '@/src/components/atoms/Button';
import { SelectIncomeOrExpenditureButtonText } from '@/src/utils/constants';

const Container = styled.div`
  display: flex;
  border: 1px solid;
  justify-content: space-around;
`;

export interface ISelectIncomeOrExpenditure extends ButtonProps {
  selectedButton: string;
}

export const SelectIncomeOrExpenditure: React.FC<ISelectIncomeOrExpenditure> = ({ buttonType, onClick, selectedButton }) => {
  console.log(selectedButton === SelectIncomeOrExpenditureButtonText.INCOME);
  return (
    <Container>
      <Button
        buttonType={buttonType}
        onClick={() => onClick(SelectIncomeOrExpenditureButtonText.INCOME)}
        whichButton={SelectIncomeOrExpenditureButtonText.INCOME}
        isSelected={selectedButton === SelectIncomeOrExpenditureButtonText.INCOME}
      >
        {SelectIncomeOrExpenditureButtonText.INCOME}
      </Button>
      <Button
        buttonType={buttonType}
        onClick={() => onClick(SelectIncomeOrExpenditureButtonText.EXPENDITURE)}
        whichButton={SelectIncomeOrExpenditureButtonText.EXPENDITURE}
        isSelected={selectedButton === SelectIncomeOrExpenditureButtonText.EXPENDITURE}
      >
        {SelectIncomeOrExpenditureButtonText.EXPENDITURE}
      </Button>
    </Container>
  );
};
