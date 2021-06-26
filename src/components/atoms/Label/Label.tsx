import { calcRem } from '@/src/styles/theme';
import React from 'react';
import styled, { css } from 'styled-components';

interface LabelStyleProps {
  type: 'ledgerLabel' | 'default';
}

export interface ILabel extends LabelStyleProps {}

const Conatiner = styled.label<LabelStyleProps>`
  ${(props) =>
    props.type === 'ledgerLabel' &&
    css`
      font-size: ${calcRem(25)};
    `}
`;

export const Label: React.FC<ILabel> = ({ type, children }) => {
  return <Conatiner type={type}>{children}</Conatiner>;
};
