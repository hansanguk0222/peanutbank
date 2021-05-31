import styled, { css } from 'styled-components';

interface StyleSpanProps {
  spanType: 'calendarDate' | 'default';
  day?: number;
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
        css`
          color: ${(props) => props.theme.color.red1};
        `};
      ${(props) =>
        props.day === 6 &&
        css`
          color: ${(props) => props.theme.color.blue1};
        `};
      ${(props) =>
        props.day !== 0 &&
        props.day !== 6 &&
        css`
          color: ${(props) => props.theme.color.black5};
        `};
    `}
`;

export const Span: React.FC<SpanProps> = ({ spanType, children, day, onClick }) => {
  return (
    <StyledSpan spanType={spanType} day={day} onClick={onClick}>
      {children}
    </StyledSpan>
  );
};
