import React from 'react';
import styled, { css } from 'styled-components';
import { Button, IButton } from '@/src/components/atoms/Button';
import { SelectIncomeOrExpenditureButtonText } from '@/src/utils/constants';
import { calcRem } from '@/src/styles/theme';

const Container = styled.div`
  display: flex;
  width: ${calcRem(200)};
  justify-content: space-around;
`;

export interface ISelectIncomeOrExpenditure extends IButton {
  selectedButton: string;
}

export const SelectIncomeOrExpenditure: React.FC<ISelectIncomeOrExpenditure> = ({ buttonType, onClick, selectedButton }) => {
  return (
    <Container>
      <Button
        buttonType={buttonType}
        onClick={(e) => onClick({ e, incomeOrExpenditure: SelectIncomeOrExpenditureButtonText.INCOME })}
        whichButton={SelectIncomeOrExpenditureButtonText.INCOME}
        isSelected={selectedButton === SelectIncomeOrExpenditureButtonText.INCOME}
      >
        {SelectIncomeOrExpenditureButtonText.INCOME}
      </Button>
      <Button
        buttonType={buttonType}
        onClick={(e) => onClick({ e, incomeOrExpenditure: SelectIncomeOrExpenditureButtonText.EXPENDITURE })}
        whichButton={SelectIncomeOrExpenditureButtonText.EXPENDITURE}
        isSelected={selectedButton === SelectIncomeOrExpenditureButtonText.EXPENDITURE}
      >
        {SelectIncomeOrExpenditureButtonText.EXPENDITURE}
      </Button>
    </Container>
  );
};
