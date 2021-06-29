import styled from 'styled-components';
import { ChangeMonthBar, IChangeMonthBar } from '../ChangeMonthBar';
import { CalendarOnlyDate, ICalendarOnlyDate } from '@/src/components/molecules/CalendarOnlyDate';

export interface ICalendar extends IChangeMonthBar, Omit<ICalendarOnlyDate, 'onClick' | 'incomeOrExpenditure'> {
  onDateClick: (e) => void;
}

const Container = styled.div`
  border: 2px solid black;
  height: 100%;
  width: 100%;
`;

export const Calendar: React.FC<ICalendar> = ({
  buttonType,
  datesWithDays,
  inputType,
  leftArrowOnClick,
  readOnly,
  rightArrowOnClick,
  spanType,
  text,
  onDateClick,
  beforeCalendar,
  nextCalendar,
  expenditureLabel,
  incomeLabel,
  accountBook,
  thisYearAndMonth,
  monthIncomeAndExpenditureVisible,
  dateSelectCalendar,
}) => {
  return (
    <Container>
      <ChangeMonthBar
        buttonType={buttonType}
        inputType={inputType}
        leftArrowOnClick={leftArrowOnClick}
        readOnly={readOnly}
        rightArrowOnClick={rightArrowOnClick}
        text={text}
        beforeCalendar={beforeCalendar}
        nextCalendar={nextCalendar}
        expenditureLabel={expenditureLabel}
        incomeLabel={incomeLabel}
        monthIncomeAndExpenditureVisible={monthIncomeAndExpenditureVisible}
        dateSelectCalendar={dateSelectCalendar}
      />
      <CalendarOnlyDate datesWithDays={datesWithDays} spanType={spanType} onClick={onDateClick} accountBook={accountBook} thisYearAndMonth={thisYearAndMonth} />
    </Container>
  );
};
