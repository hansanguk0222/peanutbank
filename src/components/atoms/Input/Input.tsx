import { calcRem } from '@/src/styles/theme';
import { LedgerInputLabelText } from '@/src/utils/constants';
import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import { SelectIncomeOrExpenditureButtonText } from '@/src/utils/constants';

interface InputStyleProps {
  inputType: 'ledgerInput' | 'dateInput' | 'defaultInput';
  incomeOrExpenditure?: string;
  dateSelectCalendar?: boolean;
}

export interface IInput extends InputStyleProps {
  onChange: (e: ChangeEvent) => void | undefined;
  label?: string;
  text: string;
  readOnly: boolean;
  list?: string;
}

const StyledInput = styled.input<InputStyleProps>`
  ${(props) =>
    props.inputType === 'ledgerInput' &&
    css<IInput>`
      width: ${calcRem(250)};
      border-left: 0;
      border-right: 0;
      border-top: 0;
      border-bottom: ${calcRem(2)} solid ${(props) => props.theme.color.gray3};
      margin-left: ${calcRem(15)};
      &:focus {
        ${(props) =>
          props.incomeOrExpenditure === SelectIncomeOrExpenditureButtonText.EXPENDITURE
            ? css`
                border-bottom: none;
                box-shadow: ${(props) => props.theme.boxShadow.bottomRed};
              `
            : css`
                border-bottom: none;
                box-shadow: ${(props) => props.theme.boxShadow.bottomSkyBlue};
              `}
      }
      width:${calcRem(250)}
      color: ${(props) => props.theme.color.black7};
      font-size: ${(props) => props.theme.size.font.s};
    `}
  ${(props) =>
    props.inputType === 'dateInput' &&
    css<InputStyleProps>`
      border: none;
      background: none;
      font-size: ${(props) => props.theme.size.font.xl};
      text-align: center;
      ${(props) =>
        props.dateSelectCalendar !== true
          ? css` 
          margin-left: ${calcRem(20)};
          margin-right ${calcRem(20)};
      `
          : css`
              width: ${calcRem(100)};
            `}
    `}
  padding: ${calcRem(10)};
  outline: none;
`;

export const Input: React.FC<IInput> = ({ inputType = 'defaultInput', label, text, onChange, readOnly, list, incomeOrExpenditure, dateSelectCalendar }) => {
  return (
    <StyledInput
      data-testid={inputType}
      inputType={inputType}
      onChange={onChange}
      value={text}
      placeholder={label}
      readOnly={readOnly}
      list={list}
      incomeOrExpenditure={incomeOrExpenditure}
      required={list ? true : false}
      dateSelectCalendar={dateSelectCalendar}
    />
  );
};
