/* eslint-disable @typescript-eslint/no-empty-function */
import styled from 'styled-components';
import { ButtonWithIcon, IButtonWithIcon } from '@/src/components/molecules/IconWithButton';
import { Input as DateInput, IInput } from '@/src/components/atoms/Input';
import { MonthIncomeAndExpenditure, IMonthIncomeAndExpenditure } from '@/src/components/molecules/MonthIncomeAndExpenditure';
import { LeftArrow, RightArrow } from '@/public/svg';
import Link from 'next/link';

export interface IChangeMonthBar extends Omit<IButtonWithIcon, 'onClick' | 'src' | 'alt'>, Omit<IInput, 'onChange' | 'testId'>, IMonthIncomeAndExpenditure {
  leftArrowOnClick: () => void;
  rightArrowOnClick: () => void;
  beforeCalendar?: string;
  nextCalendar?: string;
  monthIncomeAndExpenditureVisible: boolean;
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  border: 1px solid black;
`;

export const ChangeMonthBar: React.FC<IChangeMonthBar> = ({
  buttonType,
  inputType,
  leftArrowOnClick,
  rightArrowOnClick,
  text,
  readOnly,
  beforeCalendar,
  nextCalendar,
  expenditureLabel,
  incomeLabel,
  monthIncomeAndExpenditureVisible,
  dateSelectCalendar,
}) => {
  return (
    <Container>
      {monthIncomeAndExpenditureVisible ? (
        <Link href={`/calendar/${beforeCalendar}`} data-testid="beforeMonthLink">
          <a>
            <ButtonWithIcon buttonType={buttonType} onClick={leftArrowOnClick} testId="beforeMonthButton">
              <LeftArrow />
            </ButtonWithIcon>
          </a>
        </Link>
      ) : (
        <ButtonWithIcon buttonType={buttonType} onClick={leftArrowOnClick} testId="beforeMonthButton">
          <LeftArrow />
        </ButtonWithIcon>
      )}
      <DateInput inputType={inputType} onChange={() => {}} readOnly={readOnly} text={text} dateSelectCalendar={dateSelectCalendar} testId="dateInput" />
      {monthIncomeAndExpenditureVisible ? (
        <Link href={`/calendar/${nextCalendar}`}>
          <a>
            <ButtonWithIcon buttonType={buttonType} onClick={rightArrowOnClick} testId="afterMonthButton">
              <RightArrow />
            </ButtonWithIcon>
          </a>
        </Link>
      ) : (
        <ButtonWithIcon buttonType={buttonType} onClick={rightArrowOnClick} testId="afterMonthButton">
          <RightArrow />
        </ButtonWithIcon>
      )}
      {monthIncomeAndExpenditureVisible && <MonthIncomeAndExpenditure expenditureLabel={expenditureLabel} incomeLabel={incomeLabel} />}
    </Container>
  );
};
