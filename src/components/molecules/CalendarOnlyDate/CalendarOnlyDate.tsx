import styled from 'styled-components';
import { Span as DateItem, Span as DayItem, SpanProps } from '@/src/components/atoms/Span';

export interface CalendarOnlyDateProps extends SpanProps {
  datesWithDays: { date: number; day: number; thisMonth: boolean }[][];
}

const Container = styled.table`
  width: 100%;
  height: 90%;
`;

const StyledTd = styled.td`
  border: 1px solid ${(props) => props.theme.color.black9};
`;

const StyledTr = styled.tr``;

export const CalendarOnlyDate: React.FC<CalendarOnlyDateProps> = ({ datesWithDays, onClick }) => {
  return (
    <Container>
      <StyledTr>
        <StyledTd>
          <DayItem spanType="calendarDate" day={0} thisMonth={true}>
            일
          </DayItem>
        </StyledTd>
        <StyledTd>
          <DayItem spanType="calendarDate" day={1} thisMonth={true}>
            월
          </DayItem>
        </StyledTd>
        <StyledTd>
          <DayItem spanType="calendarDate" day={2} thisMonth={true}>
            화
          </DayItem>
        </StyledTd>
        <StyledTd>
          <DayItem spanType="calendarDate" day={3} thisMonth={true}>
            수
          </DayItem>
        </StyledTd>
        <StyledTd>
          <DayItem spanType="calendarDate" day={4} thisMonth={true}>
            목
          </DayItem>
        </StyledTd>
        <StyledTd>
          <DayItem spanType="calendarDate" day={5} thisMonth={true}>
            금
          </DayItem>
        </StyledTd>
        <StyledTd>
          <DayItem spanType="calendarDate" day={6} thisMonth={true}>
            토
          </DayItem>
        </StyledTd>
      </StyledTr>
      {datesWithDays.map((week, idx) => (
        <StyledTr key={idx}>
          {week.map((item) => {
            return (
              <StyledTd key={String(item.date) + String(item.day)}>
                {item.date === 0 && <DateItem spanType="calendarDate" onClick={onClick} day={item.day} />}
                {item.date !== 0 && (
                  <DateItem spanType="calendarDate" onClick={onClick} day={item.day} thisMonth={item.thisMonth}>
                    {item.date}
                  </DateItem>
                )}
              </StyledTd>
            );
          })}
        </StyledTr>
      ))}
    </Container>
  );
};
