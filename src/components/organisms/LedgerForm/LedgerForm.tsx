/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { DataList, IDataList } from '@/src/components/organisms/DataList';
import { ILabelInput, LabelInput } from '@/src/components/molecules/LabelInput';
import { Button, IButton } from '@/src/components/atoms/Button';
import { Form, IForm } from '@/src/components/atoms/Form';
import { ISelectIncomeOrExpenditure, SelectIncomeOrExpenditure } from '@/src/components/molecules/SelectIncomeOrExpenditure';
import { ICategory } from '@/src/type/store';
import { LedgerInputLabelText, LabelText } from '@/src/utils/constants';
import { calcRem } from '@/src/styles/theme';
import { DateSelectCalendar, IDateSelectCalendar } from '@/src/components/organisms/DateSelectCalendar';
import { DataListIds } from '@/src/utils/constants';
import { changeNumberForm, splitByCommaAndJoinAmount } from '@/src/utils';
import { Input, IInput, StyledInput } from '../../atoms/Input';

const Container = styled.div`
  display: flex;
  width: ${calcRem(300)};
  justify-content: flex-end;
`;

interface ISubmitInput extends Omit<IInput, 'incomeOrExpenditure' | 'onChange' | 'text' | 'readOnly' | 'list' | 'label' | 'dateSelectCalendar'> {}

const SubmitInput: React.FC<ISubmitInput> = ({ inputType }) => {
  return <StyledInput inputType={inputType} type="submit" value="제출" />;
};

export interface ILedgerForm
  extends Omit<ILabelInput, 'testId' | 'text' | 'onChange' | 'inputType' | 'readOnly' | 'labelValue' | 'descriptionInputTestId' | 'labelType' | 'readOnly' | 'inputType' | 'labelType'>,
    Omit<IDataList, 'testId' | 'optionList' | 'id' | 'onChange' | 'text' | 'labelValue' | 'descriptionInputTestId' | 'readOnly' | 'inputType' | 'labelType' | 'category'>,
    Omit<IButton, 'onClick' | 'buttonType' | 'testId' | 'descriptionInputTestId' | 'inputType' | 'text'>,
    Omit<IForm, 'type' | 'id' | 'descriptionInputTestId' | 'readOnly' | 'amount' | 'text'>,
    Omit<ISelectIncomeOrExpenditure, 'onClick' | 'buttonType' | 'labelValue' | 'descriptionInputTestId' | 'text' | 'selectedDate'>,
    Omit<IDateSelectCalendar, 'buttonType' | 'inputType' | 'spanType' | 'text' | 'selectedDate' | 'thisYearAndMonth'> {
  onClickClearButton: (e: MouseEvent) => void;
  onClickSelectIncomeOrExpenditure: ({ e: MouseEvent, incomeOrExpenditure: string }) => void;
  dataListOptionList: ICategory[];
  onChangeAmountInput: (e: ChangeEvent) => void;
  onChangeDescriptionInput: (e: ChangeEvent) => void;
  onChangeDataList: (e: ChangeEvent) => void;
  selectDateValue: string;
  dataListValue: string;
  amountValue: string;
  descriptionValue: string;
  yearAndMonthValue: string;
}

export const LedgerForm: React.FC<ILedgerForm> = ({
  onClickClearButton,
  onSubmitLedger,
  onChangeDataList,
  onClickSelectIncomeOrExpenditure,
  onChangeAmountInput,
  onChangeDescriptionInput,
  onDateClick,
  changeCalendarVisible,
  leftArrowOnClick,
  rightArrowOnClick,
  closeModal,
  dataListOptionList,
  selectedButton,
  incomeOrExpenditure,
  datesWithDays,
  calendarVisible,
  monthIncomeAndExpenditureVisible,
  dateSelectCalendar,
  userId,
  amountValue,
  category,
  selectDateValue,
  descriptionValue,
  dataListValue,
  yearAndMonthValue,
}) => {
  return (
    <Form
      type="ledger"
      amount={splitByCommaAndJoinAmount(amountValue)}
      userId={userId}
      category={category}
      description={descriptionValue}
      onSubmitLedger={onSubmitLedger}
      incomeOrExpenditure={selectedButton}
      selectedDate={selectDateValue}
    >
      <DateSelectCalendar
        buttonType="changeMonthButton"
        inputType="dateInput"
        leftArrowOnClick={leftArrowOnClick}
        readOnly={true}
        rightArrowOnClick={rightArrowOnClick}
        text={yearAndMonthValue}
        datesWithDays={datesWithDays}
        spanType="calendarDate"
        onDateClick={onDateClick}
        thisYearAndMonth={yearAndMonthValue}
        selectedDate={selectDateValue}
        calendarVisible={calendarVisible}
        changeCalendarVisible={changeCalendarVisible}
        monthIncomeAndExpenditureVisible={monthIncomeAndExpenditureVisible}
        dateSelectCalendar={dateSelectCalendar}
        closeModal={closeModal}
      />
      <SelectIncomeOrExpenditure buttonType="selectIncomeOrExpenditureButton" onClick={onClickSelectIncomeOrExpenditure} selectedButton={selectedButton} />
      <DataList
        id="categoryList"
        optionList={dataListOptionList}
        inputType="ledgerInput"
        labelType="ledgerLabel"
        labelValue={LabelText.CATEGORY}
        onChange={onChangeDataList}
        readOnly={false}
        text={dataListValue}
        incomeOrExpenditure={incomeOrExpenditure}
        label={LedgerInputLabelText.CATEGORY}
        list={DataListIds.CATEGORY}
        testId="inputCategory"
      />
      <LabelInput
        inputType="ledgerInput"
        labelType="ledgerLabel"
        onChange={onChangeAmountInput}
        labelValue={LabelText.AMOUNT}
        readOnly={false}
        text={changeNumberForm(splitByCommaAndJoinAmount(amountValue))}
        label={LedgerInputLabelText.AMOUNT}
        incomeOrExpenditure={incomeOrExpenditure}
        testId="inputAmount"
      />
      <LabelInput
        inputType="ledgerInput"
        labelType="ledgerLabel"
        onChange={onChangeDescriptionInput}
        labelValue={LabelText.DESCRIPTION}
        readOnly={false}
        text={descriptionValue}
        label={LedgerInputLabelText.DESCRIPTION}
        incomeOrExpenditure={incomeOrExpenditure}
        testId="inputdescription"
      />
      <Container>
        <Button buttonType="clearButton" onClick={onClickClearButton}>
          초기화
        </Button>
        <SubmitInput inputType="submitInput" testId="submitLedgerForm" />
      </Container>
    </Form>
  );
};
