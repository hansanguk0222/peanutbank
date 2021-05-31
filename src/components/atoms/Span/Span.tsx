import styled, { css } from 'styled-components';

interface StyleSpanProps {
  spanType: 'calendarDate' | 'default';
  day?: number;
  thisMonth?: boolean;
}

export interface SpanProps extends StyleSpanProps {
  onClick?: () => void;
}

const StyledSpan = styled.span<StyleSpanProps>`
  ${(props) =>
    props.spanType === 'calendarDate' &&
    css<StyleSpanProps>`
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
`;

export const Span: React.FC<SpanProps> = ({ spanType, children, day, onClick, thisMonth }) => {
  console.log(thisMonth);
  return (
    <StyledSpan spanType={spanType} day={day} onClick={onClick} thisMonth={thisMonth}>
      {children}
    </StyledSpan>
  );
};
