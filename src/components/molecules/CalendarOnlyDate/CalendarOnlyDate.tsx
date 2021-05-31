import styled from 'styled-components';

import { Span as DateItem, SpanProps } from '@/src/components/atoms/Span';
import { stringify } from 'querystring';

export interface CalendarOnlyDateProps extends SpanProps {
  datesWithDays: { date: number; day: number }[][];
}

const Container = styled.table`
  width: 100%;
  height: 100%;
`;

export const CalendarOnlyDate: React.FC<CalendarOnlyDateProps> = ({ datesWithDays, onClick }) => {
  return (
    <Container>
      {datesWithDays.map((week, idx) => (
        <tr key={idx}>
          {week.map((item) => {
            return (
              <td key={String(item.date)}>
                {item.date === 0 && <DateItem spanType="calendarDate" onClick={onClick} day={item.day} />}
                {item.date !== 0 && (
                  <DateItem spanType="calendarDate" onClick={onClick} day={item.day}>
                    {item.date}
                  </DateItem>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </Container>
  );
};
