import styled, { css } from 'styled-components';
import { Span as DateItem, Span as DayItem, Span as DateIncomeAndExpenditure, SpanProps } from '@/src/components/atoms/Span';
import { calcRem } from '@/src/styles/theme';
import { IAccountBook } from '@/src/type/store';
import { addDateAmount, changeNumberForm } from '@/src/utils';

export interface CalendarOnlyDateProps extends SpanProps {
  datesWithDays: { yearAndMonth: string; date: number; day: number; thisMonth: boolean }[][];
  accountBook?: IAccountBook;
  thisYearAndMonth: string;
}

interface StyledTdType {
  tableHeader?: boolean;
}

const Container = styled.table`
  width: 100%;
  height: 90%;
  table-layout: fixed;
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

const TdContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const StyledTr = styled.tr``;

const IncomeAndExependitureContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: ${calcRem(3)};
  bottom: ${calcRem(3)};
`;

const DateContainer = styled.div`
  position: absolute;
  left: ${calcRem(3)};
  top: ${calcRem(3)};
`;

export const CalendarOnlyDate: React.FC<CalendarOnlyDateProps> = ({ thisYearAndMonth, datesWithDays, onClick, accountBook }) => {
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
              if (accountBook !== undefined) {
                Object.keys(accountBook).map((yearAndMonthKey) => {
                  Object.keys(accountBook[yearAndMonthKey].expenditure).map((expenditureKey) => {
                    if (
                      (item.date === Number(expenditureKey) && item.yearAndMonth === thisYearAndMonth && yearAndMonthKey === item.yearAndMonth) ||
                      (item.date === Number(expenditureKey) && item.yearAndMonth !== thisYearAndMonth && yearAndMonthKey === item.yearAndMonth)
                    ) {
                      dateExpenditure = addDateAmount(accountBook[yearAndMonthKey].expenditure[expenditureKey]);
                    }
                  });
                  Object.keys(accountBook[yearAndMonthKey].income).map((incomeKey) => {
                    if (
                      (item.date === Number(incomeKey) && item.yearAndMonth === thisYearAndMonth && yearAndMonthKey === item.yearAndMonth) ||
                      (item.date === Number(incomeKey) && item.yearAndMonth !== thisYearAndMonth && yearAndMonthKey === item.yearAndMonth)
                    ) {
                      dateIncome = addDateAmount(accountBook[yearAndMonthKey].income[incomeKey]);
                    }
                  });
                });
              }
              return (
                <StyledTd key={String(item.date) + String(item.day)} onClick={() => onClick(item.yearAndMonth + '-' + item.date)}>
                  <TdContainer>
                    <DateContainer>
                      <DateItem spanType="calendarDate" day={item.day} thisMonth={item.thisMonth}>
                        {item.date}
                      </DateItem>
                    </DateContainer>
                    <IncomeAndExependitureContainer>
                      {dateIncome !== 0 && (
                        <DateIncomeAndExpenditure spanType="showMonthIncomeAndExpenditure" incomeOrExpenditure="income" notThisMonth={item.thisMonth}>
                          {changeNumberForm(dateIncome)}
                        </DateIncomeAndExpenditure>
                      )}
                      {dateExpenditure !== 0 && (
                        <DateIncomeAndExpenditure spanType="showMonthIncomeAndExpenditure" incomeOrExpenditure="expenditure" notThisMonth={item.thisMonth}>
                          {changeNumberForm(dateExpenditure)}
                        </DateIncomeAndExpenditure>
                      )}
                    </IncomeAndExependitureContainer>
                  </TdContainer>
                </StyledTd>
              );
            })}
          </StyledTr>
        ))}
      </tbody>
    </Container>
  );
};
