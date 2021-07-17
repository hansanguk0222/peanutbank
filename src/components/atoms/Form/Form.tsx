import { calcRem } from '@/src/styles/theme';
import React, { FormEvent } from 'react';
import styled, { css } from 'styled-components';

interface FormStyleProps {
  type: 'default' | 'ledger';
}

export interface IForm extends FormStyleProps {
  onSubmitLedger?: ({
    e,
    userId,
    id,
    selectedDate,
    incomeOrExpenditure,
    category,
    amount,
    description,
  }: {
    e: FormEvent;
    userId: string;
    id?: string;
    incomeOrExpenditure: string;
    selectedDate: string;
    category: string;
    amount: number;
    description: string;
  }) => void;
  userId: string;
  category: string;
  amount?: number;
  description?: string;
  id?: string;
  selectedDate?: string;
  incomeOrExpenditure?: string;
}

const Container = styled.form<FormStyleProps>`
  width: ${calcRem(500)};
  height: ${calcRem(400)};
  border-radius: ${calcRem(15)};
  ${(props) =>
    props.type === 'ledger' &&
    css`
      background: ${(props) => props.theme.color.gray5};
    `}
  box-shadow: ${(props) => props.theme.boxShadow.black};
  padding: ${calcRem(30)};
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

export const Form: React.FC<IForm> = ({ type, onSubmitLedger, id, selectedDate, amount, incomeOrExpenditure, category, description, children, userId }) => {
  return (
    <Container type={type} onSubmit={(e) => type === 'ledger' && onSubmitLedger({ e, id, userId, amount, selectedDate, incomeOrExpenditure, category, description })}>
      {children}
    </Container>
  );
};
