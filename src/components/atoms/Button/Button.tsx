import React from 'react';
import styled, { css } from 'styled-components';
import { calcRem } from '@/src/styles/theme';
import { SelectIncomeOrExpenditureButtonText } from '@/src/utils/constants';

interface ButtonStyleProps {
  buttonType: 'changeMonthButton' | 'profileButton' | 'submitButton' | 'cancelButton' | 'closeModalButton' | 'removeItemButton' | 'defaultButton' | 'selectIncomeOrExpenditureButton';
  isSelected?: boolean;
  whichButton?: string;
  testId?: string;
}

export interface ButtonProps extends ButtonStyleProps {
  onClick: (args: any) => void;
}

const StyledButton = styled.button<ButtonStyleProps>`
  ${(props) =>
    props.buttonType === 'profileButton' &&
    css`
      position: relative;
      border-radius: 50%;
      width: ${calcRem(50)};
      height: ${calcRem(50)};
      border: none;
      outline-color: white;
      &:hover {
        cursor: pointer;
      }
      &:hover {
        &: after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: ${calcRem(50)};
          height: ${calcRem(50)};
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
        }
      }
    `}
  ${(props) =>
    props.buttonType === 'changeMonthButton' &&
    css`
      background: none;
      height: ${calcRem(25)};
      width: ${calcRem(15)};
    `}
  ${(props) =>
    props.buttonType === 'selectIncomeOrExpenditureButton' &&
    css<ButtonProps>`
      background: none;
      border: ${calcRem(3)} dashed;
      outline: none;
      padding: ${calcRem(5)};
      font-weight: ${(props) => props.theme.fontWeight.bold};
      ${(props) =>
        props.isSelected &&
        props.whichButton === SelectIncomeOrExpenditureButtonText.EXPENDITURE &&
        css`
          border: ${calcRem(3)} dashed ${(props) => props.theme.color.red1};
          color: ${(props) => props.theme.color.red1};
          padding: ${calcRem(5)};
          font-weight: ${(props) => props.theme.fontWeight.bold};
        `}
      ${(props) =>
        props.isSelected &&
        props.whichButton === SelectIncomeOrExpenditureButtonText.INCOME &&
        css`
          border: ${calcRem(3)} dashed ${(props) => props.theme.color.blue1};
          color: ${(props) => props.theme.color.blue1};
          padding: ${calcRem(5)};
          font-weight: ${(props) => props.theme.fontWeight.bold};
        `};
    `}
`;

export const Button: React.FC<ButtonProps> = ({ buttonType = 'defaultButton', onClick, isSelected, children, testId, whichButton }) => {
  return (
    <StyledButton data-testid={testId} isSelected={isSelected} onClick={onClick} buttonType={buttonType} whichButton={whichButton}>
      {children}
    </StyledButton>
  );
};
