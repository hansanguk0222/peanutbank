import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import { ISelectList, SelectList } from '@/src/components/molecules/SelectList';
import { DataList, IDataList } from '@/src/components/organisms/DataList';
import { ILabelInput, LabelInput } from '@/src/components/molecules/LabelInput';
import { Button, ButtonProps } from '@/src/components/atoms/Button';
import { Form, IForm } from '@/src/components/atoms/Form';
import { ISelectIncomeOrExpenditure, SelectIncomeOrExpenditure } from '@/src/components/molecules/SelectIncomeOrExpenditure';
import { Icategory } from '@/src/type/store';
import { LedgerInputLabelText, LabelText } from '@/src/utils/constants';
import { calcRem } from '@/src/styles/theme';
import { DateSelectCalendar, IDateSelectCalendar } from '@/src/components/organisms/DateSelectCalendar';
import { makeDatesWithDays } from '@/src/utils';

const Container = styled.div`
  display: flex;
  width: ${calcRem(300)};
  justify-content: flex-end;
`;

export interface ILedgerForm
  extends Omit<ILabelInput, 'text' | 'onChange' | 'inputType' | 'readOnly' | 'labelValue' | 'discriptionInputTestId' | 'labelType' | 'readOnly' | 'inputType' | 'labelType'>,
    Omit<IDataList, 'optionList' | 'id' | 'onChange' | 'text' | 'labelValue' | 'discriptionInputTestId' | 'readOnly' | 'inputType' | 'labelType'>,
    Omit<ISelectList, 'optionList' | 'id' | 'value' | 'onChange' | 'labelValue' | 'discriptionInputTestId' | 'readOnly' | 'inputType' | 'labelType'>,
    Omit<ButtonProps, 'onClick' | 'buttonType' | 'testId' | 'discriptionInputTestId' | 'inputType'>,
    Omit<IForm, 'type' | 'id' | 'discriptionInputTestId' | 'readOnly'>,
    Omit<ISelectIncomeOrExpenditure, 'onClick' | 'buttonType' | 'labelValue' | 'discriptionInputTestId'>,
    Omit<IDateSelectCalendar, 'buttonType' | 'inputType' | 'spanType'> {
  onClickClearButton: (e: MouseEvent) => void;
  onClickSubmitButton: (e: MouseEvent) => void;
  onClickSelectIncomeOrExpenditure: (whichButton: string) => void;
  dataListOptionList: Icategory[];
  selectListOptionList: string[];
  onChangeAmountInput: (e: ChangeEvent) => void;
  onChangeDiscriptionInput: (e: ChangeEvent) => void;
  onChangeSelectList: (e: ChangeEvent) => void;
  onChangeDataList: (e: ChangeEvent) => void;
  selectDateValue: string;
  dataListValue: string;
  amountValue: string;
  discriptionValue: string;
}

export const LedgerForm: React.FC<ILedgerForm> = ({
  dataListOptionList,
  onClickClearButton,
  onClickSubmitButton,
  list,
  onSubmitLedger,
  amount,
  category,
  discription,
  onChangeDataList,
  selectDateValue,
  onClickSelectIncomeOrExpenditure,
  selectedButton,
  dataListValue,
  incomeOrExpenditure,
  onChangeAmountInput,
  onChangeDiscriptionInput,
  amountValue,
  discriptionValue,
  leftArrowOnClick,
  rightArrowOnClick,
  text,
  beforeCalendar,
  nextCalendar,
  datesWithDays,
  onDateClick,
  thisYearAndMonth,
  calendarVisible,
  changeCalendarVisible,
  monthIncomeAndExpenditureVisible,
  dateSelectCalendar,
  closeModal,
}) => {
  return (
    <Form type="ledger" amount={amount} category={category} discription={discription} onSubmitLedger={onSubmitLedger}>
      <DateSelectCalendar
        buttonType="changeMonthButton"
        inputType="dateInput"
        leftArrowOnClick={leftArrowOnClick}
        readOnly={true}
        rightArrowOnClick={rightArrowOnClick}
        text={text}
        beforeCalendar={beforeCalendar}
        nextCalendar={nextCalendar}
        datesWithDays={datesWithDays}
        spanType="calendarDate"
        onDateClick={onDateClick}
        thisYearAndMonth={thisYearAndMonth}
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
        list={list}
      />
      <LabelInput
        inputType="ledgerInput"
        labelType="ledgerLabel"
        onChange={onChangeAmountInput}
        labelValue={LabelText.AMOUNT}
        readOnly={false}
        text={amountValue}
        label={LedgerInputLabelText.AMOUNT}
        incomeOrExpenditure={incomeOrExpenditure}
      />
      <LabelInput
        inputType="ledgerInput"
        labelType="ledgerLabel"
        onChange={onChangeDiscriptionInput}
        labelValue={LabelText.DISCRIPTION}
        readOnly={false}
        text={discriptionValue}
        label={LedgerInputLabelText.DISCRIPTION}
        incomeOrExpenditure={incomeOrExpenditure}
      />
      <Container>
        <Button buttonType="clearButton" onClick={onClickClearButton}>
          초기화
        </Button>
        <Button buttonType="submitButton" onClick={onClickSubmitButton}>
          제출
        </Button>
      </Container>
    </Form>
  );
};
