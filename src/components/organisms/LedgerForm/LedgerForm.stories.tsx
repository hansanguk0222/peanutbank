import React, { ChangeEvent, useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { category } from '@/src/__test__/__feature__';
import { ILedgerForm, LedgerForm } from './LedgerForm';
import { LedgerInputLabelText, LabelText, SelectIncomeOrExpenditureButtonText, DataListIds } from '@/src/utils/constants';
import { makeDatesWithDays } from '@/src/utils';
export default {
  title: 'organisms/LedgerForm',
  component: LedgerForm,
  argTypes: {},
} as Meta;

const Template: Story<ILedgerForm> = (args) => {
  const [amountValue, setAmountValue] = useState<string>('');
  const [discriptionValue, setDiscriptionValue] = useState<string>('');
  const [selectDateValue, setSelectDateValue] = useState<string>('2021-06-30');
  const [selectedButton, setSelectedButton] = useState<string>(SelectIncomeOrExpenditureButtonText.INCOME);
  const [dataListValue, setDataListValue] = useState<string>('');

  const [yearAndMonth, setYearAndMonth] = useState<{ year: number; month: number }>({ year: 2021, month: 6 });
  const [datesWithDays, setDatesWithDays] = useState<{ yearAndMonth: string; date: number; day: number; thisMonth: boolean }[][]>([]);
  const [calnedarVisible, setCalendarVisible] = useState<boolean>(false);
  useEffect(() => {
    const { year, month } = yearAndMonth;
    setDatesWithDays(makeDatesWithDays({ year, month }));
  }, [yearAndMonth]);
  const changeYearAndMonth: ({ upOrDown }: { upOrDown: 'up' | 'down' }) => void = ({ upOrDown }: { upOrDown: 'up' | 'down' }) => {
    const { year, month } = yearAndMonth;
    if (upOrDown === 'down') {
      if (month === 1) {
        setYearAndMonth({ year: year - 1, month: 12 });
      } else {
        setYearAndMonth({ year, month: month - 1 });
      }
    } else {
      if (month === 12) {
        setYearAndMonth({ year: year + 1, month: 1 });
      } else {
        setYearAndMonth({ year, month: month + 1 });
      }
    }
  };
  const onDateClick = (e: string) => {
    const sliceByBar = e.split('-');
    const year = sliceByBar[0];
    const month = sliceByBar[1].length === 1 ? '0' + sliceByBar[1] : sliceByBar[1];
    const date = sliceByBar[2].length === 1 ? '0' + sliceByBar[2] : sliceByBar[2];
    setSelectDateValue(`${year}-${month}-${date}`);
    setCalendarVisible(!calnedarVisible);
  };

  const changeCalendarVisible = () => {
    setCalendarVisible(!calnedarVisible);
  };

  const onSubmitLedger: any = ({ id, amount, category, discription }) => {
    console.log(id, amount, category, discription);
  };

  const onChangeSelectList = (e) => {
    console.log(e.target.value);
    setSelectDateValue(e.target.value);
  };

  const onClickSelectIncomeOrExpenditure = (whichButton: '수입' | '지출') => {
    console.log(whichButton);
    setSelectedButton(whichButton);
  };

  const onChangeDataList = (e: ChangeEvent<HTMLInputElement>) => {
    setDataListValue(e.target.value);
  };

  const onChangeAmountInput = (e) => {
    setAmountValue(e.target.value);
  };

  const onChangeDiscriptionInput = (e) => {
    setDiscriptionValue(e.target.value);
  };

  const onClickClearButton = () => {
    setAmountValue('');
    setDataListValue('');
    setDiscriptionValue('');
    setSelectDateValue('');
    setSelectedButton(SelectIncomeOrExpenditureButtonText.INCOME);
    console.log('초기화');
  };

  const onClickSubmitButton = () => {
    setAmountValue('');
    setDataListValue('');
    setDiscriptionValue('');
    setSelectedButton(SelectIncomeOrExpenditureButtonText.INCOME);
  };

  const closeModal = () => {
    setCalendarVisible(false);
  };

  const { selectListOptionList, dataListOptionList, list } = args;

  return (
    <LedgerForm
      calendarVisible={calnedarVisible}
      selectedDate={selectDateValue}
      changeCalendarVisible={changeCalendarVisible}
      datesWithDays={datesWithDays}
      leftArrowOnClick={() => changeYearAndMonth({ upOrDown: 'down' })}
      onDateClick={onDateClick}
      readOnly={true}
      rightArrowOnClick={() => changeYearAndMonth({ upOrDown: 'up' })}
      text={`${yearAndMonth.year}-${yearAndMonth.month}`}
      thisYearAndMonth={`${yearAndMonth.year}-${yearAndMonth.month}`}
      beforeCalendar=""
      nextCalendar=""
      monthIncomeAndExpenditureVisible={false}
      dateSelectCalendar={true}
      dataListOptionList={dataListOptionList}
      onClickClearButton={onClickClearButton}
      onClickSubmitButton={onClickSubmitButton}
      selectListOptionList={selectListOptionList}
      list={list}
      amount={Number(amountValue)}
      onSubmitLedger={onSubmitLedger}
      category={dataListValue}
      discription={discriptionValue}
      onChangeSelectList={onChangeSelectList}
      onChangeDataList={onChangeDataList}
      selectDateValue={selectDateValue}
      onClickSelectIncomeOrExpenditure={onClickSelectIncomeOrExpenditure}
      selectedButton={selectedButton}
      dataListValue={dataListValue}
      incomeOrExpenditure={selectedButton}
      onChangeAmountInput={onChangeAmountInput}
      onChangeDiscriptionInput={onChangeDiscriptionInput}
      amountValue={amountValue}
      discriptionValue={discriptionValue}
      closeModal={closeModal}
    />
  );
};

export const LedgerFormTest = Template.bind({});
LedgerFormTest.args = {
  selectListOptionList: ['2021-07', '2021-06', '2021-05', '2021-04'],
  list: DataListIds.CATEGORY,
  dataListOptionList: category,
};
