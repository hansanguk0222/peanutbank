import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { DataList, IDataList } from '@/src/components/organisms/DataList';
import { ILabelInput, LabelInput } from '@/src/components/molecules/LabelInput';
import { Button, IButton } from '@/src/components/atoms/Button';
import { Form, IForm } from '@/src/components/atoms/Form';
import { ISelectIncomeOrExpenditure, SelectIncomeOrExpenditure } from '@/src/components/molecules/SelectIncomeOrExpenditure';
import { Icategory } from '@/src/type/store';
import { LedgerInputLabelText, LabelText } from '@/src/utils/constants';
import { calcRem } from '@/src/styles/theme';
import { DateSelectCalendar, IDateSelectCalendar } from '@/src/components/organisms/DateSelectCalendar';
import { DataListIds } from '@/src/utils/constants';
import { changeNumberForm, splitByCommaAndJoinAmount } from '@/src/utils';

const Container = styled.div`
  display: flex;
  width: ${calcRem(300)};
  justify-content: flex-end;
`;

export interface ILedgerForm
  extends Omit<ILabelInput, 'text' | 'onChange' | 'inputType' | 'readOnly' | 'labelValue' | 'discriptionInputTestId' | 'labelType' | 'readOnly' | 'inputType' | 'labelType'>,
    Omit<IDataList, 'optionList' | 'id' | 'onChange' | 'text' | 'labelValue' | 'discriptionInputTestId' | 'readOnly' | 'inputType' | 'labelType' | 'category'>,
    Omit<IButton, 'onClick' | 'buttonType' | 'testId' | 'discriptionInputTestId' | 'inputType' | 'text'>,
    Omit<IForm, 'type' | 'id' | 'discriptionInputTestId' | 'readOnly' | 'amount' | 'text'>,
    Omit<ISelectIncomeOrExpenditure, 'onClick' | 'buttonType' | 'labelValue' | 'discriptionInputTestId' | 'text' | 'selectedDate'>,
    Omit<IDateSelectCalendar, 'buttonType' | 'inputType' | 'spanType' | 'text' | 'selectedDate' | 'thisYearAndMonth'> {
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
  categoryValue: string;
  yearAndMonthValue: string;
}

export const LedgerForm: React.FC<ILedgerForm> = ({
  onClickClearButton,
  onClickSubmitButton,
  onSubmitLedger,
  onChangeDataList,
  onClickSelectIncomeOrExpenditure,
  onChangeAmountInput,
  onChangeDiscriptionInput,
  onDateClick,
  changeCalendarVisible,
  leftArrowOnClick,
  rightArrowOnClick,
  closeModal,
  dataListOptionList,
  selectedButton,
  incomeOrExpenditure,
  beforeCalendar,
  nextCalendar,
  datesWithDays,
  calendarVisible,
  monthIncomeAndExpenditureVisible,
  dateSelectCalendar,
  amountValue,
  categoryValue,
  selectDateValue,
  discriptionValue,
  dataListValue,
  yearAndMonthValue,
}) => {
  return (
    <Form
      type="ledger"
      amount={splitByCommaAndJoinAmount(amountValue)}
      category={categoryValue}
      discription={discriptionValue}
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
        beforeCalendar={beforeCalendar}
        nextCalendar={nextCalendar}
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
