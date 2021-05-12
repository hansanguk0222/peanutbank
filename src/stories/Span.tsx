import React from 'react';
import styled, { css } from 'styled-components';

interface SpanStyleProps {
  size: 'small' | 'medium' | 'large';
}

export interface SpanProps extends SpanStyleProps {
  label: string;
}

const Container = styled.span<SpanStyleProps>`
  ${(props) =>
    props.size === 'small' &&
    css`
      background: red;
      font-size: 10px;
      color: green;
    `}
  ${(props) =>
    props.size === 'medium' &&
    css`
      background: yellow;
      font-size: 20px;
      color: green;
    `}
  ${(props) =>
    props.size === 'large' &&
    css`
      background: blue;
      font-size: 30px;
      color: green;
    `}
`;

export const Span: React.FC<SpanProps> = ({ size = 'medium', label }) => {
  return <Container size={size}>{label}</Container>;
};
