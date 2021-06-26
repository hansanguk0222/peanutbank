import { calcRem } from '@/src/styles/theme';
import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

interface InputStyleProps {
  inputType: 'ledgerInput' | 'dateInput' | 'defaultInput';
}

export interface InputProps extends InputStyleProps {
  onChange: (e: ChangeEvent) => void | undefined;
  label?: string;
  text: string;
  readOnly: boolean;
}

const StyledInput = styled.input<InputStyleProps>`
  ${(props) =>
    props.inputType === 'ledgerInput' &&
    css`
      &:focus {
        box-shadow: 0 0 ${(props) => props.theme.size.shadow.blur} ${(props) => props.theme.size.shadow.spread} ${(props) => props.theme.color.coralBlue};
        border: ${(props) => props.theme.size.border.defaultThick} solid ${(props) => props.theme.color.coralBlue};
      }
      color: ${(props) => props.theme.color.black7};
      font-size: ${(props) => props.theme.size.font.m};
      border-radius: ${(props) => props.theme.size.border.defaultBorderRadius};
    `}
  ${(props) =>
    props.inputType === 'dateInput' &&
    css`
      font-size: ${(props) => props.theme.size.font.xl};
      text-align: center;
      margin-left: ${calcRem(20)};
      margin-right ${calcRem(20)};
    `}
  border: ${(props) => props.theme.size.border.defaultThick} solid ${(props) => props.theme.color.gray1};
  padding: ${(props) => props.theme.size.padding.xxxs};
  outline: none;
`;

export const Input: React.FC<InputProps> = ({ inputType = 'defaultInput', label, text, onChange, readOnly }) => {
  return <StyledInput data-testid={inputType} inputType={inputType} onChange={onChange} value={text} placeholder={label} readOnly={readOnly} />;
};
