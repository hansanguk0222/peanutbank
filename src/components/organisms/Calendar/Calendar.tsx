import styled from 'styled-components';
import { ChangeMonthBar, ChangeMonthBarProps } from '../ChangeMonthBar';
import { CalendarOnlyDate, CalendarOnlyDateProps } from '@/src/components/molecules/CalendarOnlyDate';

export interface CalendarProps extends ChangeMonthBarProps, Omit<CalendarOnlyDateProps, 'onClick'> {
  onDateClick: () => void;
}

const Container = styled.div`
  border: 2px solid black;
  height: 100%;
  width: 100%;
`;

export const Calendar: React.FC<CalendarProps> = ({ buttonType, datesWithDays, inputType, leftArrowOnClick, readOnly, rightArrowOnClick, spanType, text, onDateClick }) => {
  return (
    <Container>
      <ChangeMonthBar buttonType={buttonType} inputType={inputType} leftArrowOnClick={leftArrowOnClick} readOnly={readOnly} rightArrowOnClick={rightArrowOnClick} text={text} />
      <CalendarOnlyDate datesWithDays={datesWithDays} spanType={spanType} onClick={onDateClick} />
    </Container>
  );
};
