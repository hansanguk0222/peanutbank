import styled, { css } from 'styled-components';
import { Span as DateItem, Span as DayItem, SpanProps } from '@/src/components/atoms/Span';
import { calcRem } from '@/src/styles/theme';
import { IAccountBook } from '@/src/type/store';
import { addDateAmount } from '@/src/utils';
export interface CalendarOnlyDateProps extends SpanProps {
  datesWithDays: { yearAndMonth: string; date: number; day: number; thisMonth: boolean }[][];
  accountBook: IAccountBook;
  yearAndMonth: string;
}

interface StyledTdType {
  tableHeader?: boolean;
}

const Container = styled.table`
  width: 100%;
  height: 90%;
`;

const StyledTd = styled.td<StyledTdType>`
  border: 1px solid ${(props) => props.theme.color.black9};
  ${(props) =>
    props.tableHeader &&
    css`
      height: ${calcRem(30)};
      text-align: center;
    `}
`;

const StyledTr = styled.tr``;

export const CalendarOnlyDate: React.FC<CalendarOnlyDateProps> = ({ yearAndMonth, datesWithDays, onClick, accountBook }) => {
  return (
    <Container>
      <thead>
        <StyledTr>
          <StyledTd tableHeader={true}>
            <DayItem spanType="calendarDate" day={0} thisMonth={true}>
              일
            </DayItem>
          </StyledTd>
          <StyledTd tableHeader={true}>
            <DayItem spanType="calendarDate" day={1} thisMonth={true}>
              월
            </DayItem>
          </StyledTd>
          <StyledTd tableHeader={true}>
            <DayItem spanType="calendarDate" day={2} thisMonth={true}>
              화
            </DayItem>
          </StyledTd>
          <StyledTd tableHeader={true}>
            <DayItem spanType="calendarDate" day={3} thisMonth={true}>
              수
            </DayItem>
          </StyledTd>
          <StyledTd tableHeader={true}>
            <DayItem spanType="calendarDate" day={4} thisMonth={true}>
              목
            </DayItem>
          </StyledTd>
          <StyledTd tableHeader={true}>
            <DayItem spanType="calendarDate" day={5} thisMonth={true}>
              금
            </DayItem>
          </StyledTd>
          <StyledTd tableHeader={true}>
            <DayItem spanType="calendarDate" day={6} thisMonth={true}>
              토
            </DayItem>
          </StyledTd>
        </StyledTr>
      </thead>
      <tbody>
        {datesWithDays.map((week, idx) => (
          <StyledTr key={idx}>
            {week.map((item) => {
              let dateExpenditure = 0;
              let dateIncome = 0;
              Object.keys(accountBook).map((yearAndMonthKey) => {
                Object.keys(accountBook[yearAndMonthKey].expenditure).map((expenditureKey) => {
                  if (
                    (item.date === Number(expenditureKey) && item.yearAndMonth === yearAndMonth && yearAndMonthKey === item.yearAndMonth) ||
                    (item.date === Number(expenditureKey) && item.yearAndMonth !== yearAndMonth && yearAndMonthKey === item.yearAndMonth)
                  ) {
                    dateExpenditure = addDateAmount(accountBook[yearAndMonthKey].expenditure[expenditureKey]);
                  }
                });
                Object.keys(accountBook[yearAndMonthKey].income).map((incomeKey) => {
                  if (
                    (item.date === Number(incomeKey) && item.yearAndMonth === yearAndMonth && yearAndMonthKey === item.yearAndMonth) ||
                    (item.date === Number(incomeKey) && item.yearAndMonth !== yearAndMonth && yearAndMonthKey === item.yearAndMonth)
                  ) {
                    dateIncome = addDateAmount(accountBook[yearAndMonthKey].income[incomeKey]);
                  }
                });
              });
              return (
                <StyledTd key={String(item.date) + String(item.day)}>
                  <>
                    <DateItem spanType="calendarDate" onClick={onClick} day={item.day} thisMonth={item.thisMonth}>
                      {item.date}
                    </DateItem>
                    {dateExpenditure !== 0 && <div>{dateExpenditure}</div>}
                    {dateIncome !== 0 && <div>{dateIncome}</div>}
                  </>
                </StyledTd>
              );
            })}
          </StyledTr>
        ))}
      </tbody>
    </Container>
  );
};
