import { calcRem } from '@/src/styles/theme';
import styled, { css } from 'styled-components';

interface StyleISpan {
  spanType: 'calendarDate' | 'default' | 'showMonthIncomeAndExpenditure';
  day?: number;
  thisMonth?: boolean;
  incomeOrExpenditure?: 'income' | 'expenditure';
  notThisMonth?: boolean;
}

export interface ISpan extends StyleISpan {
  onClick?: (e) => void;
}

const StyledSpan = styled.span<StyleISpan>`
  ${(props) =>
    props.spanType === 'calendarDate' &&
    css<StyleISpan>`
      font-size: ${(props) => props.theme.size.font.m};
      ${(props) =>
        props.day === 0 &&
        props.thisMonth &&
        css`
          color: ${(props) => props.theme.color.red1};
        `};
      ${(props) =>
        props.day === 6 &&
        props.thisMonth &&
        css`
          color: ${(props) => props.theme.color.blue1};
        `};
      ${(props) =>
        props.day !== 0 &&
        props.thisMonth &&
        props.day !== 6 &&
        css`
          color: ${(props) => props.theme.color.black5};
        `};
      ${(props) =>
        !props.thisMonth &&
        css`
          color: ${(props) => props.theme.color.black9};
        `};
    `}
  ${(props) =>
    props.spanType === 'showMonthIncomeAndExpenditure' &&
    css<StyleISpan>`
      font-size: ${(props) => props.theme.size.font.m};
      ${(props) =>
        props.incomeOrExpenditure === 'expenditure'
          ? css`
              color: ${(props) => props.theme.color.red1};
            `
          : css`
              color: ${(props) => props.theme.color.blue1};
            `}
      ${(props) =>
        !props.notThisMonth &&
        css`
          opacity: 0.5;
        `}
    `}
`;

export const Span: React.FC<ISpan> = ({ spanType, children, day, onClick, thisMonth, incomeOrExpenditure, notThisMonth }) => {
  return (
    <StyledSpan spanType={spanType} day={day} onClick={onClick} thisMonth={thisMonth} incomeOrExpenditure={incomeOrExpenditure} notThisMonth={notThisMonth}>
      {children}
    </StyledSpan>
  );
};
