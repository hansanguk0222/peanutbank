import { calcRem } from '@/src/styles/theme';
import React from 'react';
import styled, { css } from 'styled-components';

interface FormStyleProps {
  type: 'default' | 'ledger';
}

export interface IForm extends FormStyleProps {
  onSubmitLedger?: ({ id, category, amount, discription }: { id?: string; category: string; amount: number; discription: string }) => {};
  category?: string;
  amount?: number;
  discription?: string;
  id?: string;
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

export const Form: React.FC<IForm> = ({ type, onSubmitLedger, id, amount, category, discription, children }) => {
  return (
    <Container type={type} onSubmit={() => type === 'ledger' && onSubmitLedger({ id, amount, category, discription })}>
      {children}
    </Container>
  );
};
