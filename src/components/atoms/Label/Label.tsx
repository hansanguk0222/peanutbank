import { calcRem } from '@/src/styles/theme';
import React from 'react';
import styled, { css } from 'styled-components';

interface LabelStyleProps {
  labelType: 'ledgerLabel' | 'default';
}

export interface ILabel extends LabelStyleProps {}

const Conatiner = styled.label<LabelStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.labelType === 'ledgerLabel' &&
    css`
      font-size: ${calcRem(20)};
    `};
`;

export const Label: React.FC<ILabel> = ({ labelType, children }) => {
  return <Conatiner labelType={labelType}>{children}</Conatiner>;
};
