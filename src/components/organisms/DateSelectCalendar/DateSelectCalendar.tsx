import React from 'react';
import styled, { css } from 'styled-components';
import { Calendar, ICalendar } from '@/src/components/organisms/Calendar';
import { Span } from '@/src/components/atoms/Span';
import { calcRem } from '@/src/styles/theme';
import Modal from 'react-modal';

export interface IDateSelectCalendar extends ICalendar {
  selectedDate: string;
  calendarVisible: boolean;
  changeCalendarVisible: () => void;
  closeModal: () => void;
}

const Container = styled.div`
  width: ${calcRem(300)};
`;

const CalendarContainer = styled.div`
  width: 100%;
  height: ${calcRem(300)};
  position: relative;
  background: ${(props) => props.theme.color.white};
`;

const SpanContainer = styled.div`
  margin-bottom: ${calcRem(15)};
  display: flex;
  justify-content: center;
`;

export const DateSelectCalendar: React.FC<IDateSelectCalendar> = ({
  buttonType,
  inputType,
  leftArrowOnClick,
  readOnly,
  rightArrowOnClick,
  text,
  beforeCalendar,
  nextCalendar,
  datesWithDays,
  spanType,
  onDateClick,
  thisYearAndMonth,
  selectedDate,
  calendarVisible,
  changeCalendarVisible,
  monthIncomeAndExpenditureVisible,
  dateSelectCalendar,
  closeModal,
}) => {
  return (
    <Container>
      <SpanContainer>
        <Span spanType={spanType} onClick={changeCalendarVisible}>
          {selectedDate}
        </Span>
      </SpanContainer>
      <Modal
        isOpen={calendarVisible}
        onRequestClose={closeModal}
        style={{
          overlay: { background: 'none', boxSizing: 'border-box', position: 'absolute', top: calcRem(20), left: calcRem(25) },
          content: { border: 'none ', width: calcRem(400), height: calcRem(400), background: 'none' },
        }}
        testId="ModalSelectDateCalendar"
      >
        <CalendarContainer>
          <Calendar
            buttonType={buttonType}
            inputType={inputType}
            leftArrowOnClick={leftArrowOnClick}
            readOnly={readOnly}
            rightArrowOnClick={rightArrowOnClick}
            text={text}
            beforeCalendar={beforeCalendar}
            nextCalendar={nextCalendar}
            datesWithDays={datesWithDays}
            spanType={spanType}
            onDateClick={onDateClick}
            thisYearAndMonth={thisYearAndMonth}
            monthIncomeAndExpenditureVisible={monthIncomeAndExpenditureVisible}
            dateSelectCalendar={dateSelectCalendar}
          />
        </CalendarContainer>
      </Modal>
    </Container>
  );
};
