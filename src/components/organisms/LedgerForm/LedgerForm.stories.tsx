import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { categories } from '@/src/__test__/__feature__';
import { ILedgerForm, LedgerForm } from './LedgerForm';
import { SelectIncomeOrExpenditureButtonText, DataListIds } from '@/src/utils/constants';
import { changeNumberForm, makeDatesWithDays, splitByCommaAndJoinAmount } from '@/src/utils';
export default {
  title: 'organisms/LedgerForm',
  component: LedgerForm,
  argTypes: {},
} as Meta;

const Template: Story<ILedgerForm> = (args) => {
  const [amountValue, setAmountValue] = useState<string>('');
  const [descriptionValue, setdescriptionValue] = useState<string>('');
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

  const onSubmitLedger: any = ({
    e,
    id,
    userId,
    amount,
    selectedDate,
    incomeOrExpenditure,
    category,
    description,
  }: {
    e: FormEvent;
    id: string;
    userId: string;
    amount: number;
    selectedDate: string;
    incomeOrExpenditure: string;
    category: string;
    description: string;
  }) => {
    e.preventDefault();
    console.log(id, userId, amount, selectedDate, incomeOrExpenditure, category, description);
  };

  const onClickSelectIncomeOrExpenditure = ({ e, incomeOrExpenditure }: { e: MouseEvent; incomeOrExpenditure: '수입' | '지출' }) => {
    e.preventDefault();
    setSelectedButton(incomeOrExpenditure);
  };

  const onChangeDataList = (e: ChangeEvent<HTMLInputElement>) => {
    setDataListValue(e.target.value);
  };

  const onChangeAmountInput = (e) => {
    if ((e.target.value !== undefined && /^[0-9]+(,[0-9]+)*$/g.test(e.target.value)) || e.target.value === '') {
      setAmountValue(changeNumberForm(splitByCommaAndJoinAmount(e.target.value)));
    }
  };

  const onChangeDescriptionInput = (e) => {
    setdescriptionValue(e.target.value);
  };

  const onClickClearButton = () => {
    setAmountValue('');
    setDataListValue('');
    setdescriptionValue('');
    setSelectedButton(SelectIncomeOrExpenditureButtonText.INCOME);
  };

  const closeModal = () => {
    setCalendarVisible(false);
  };

  const { dataListOptionList } = args;

  return (
    <LedgerForm
      userId="abc"
      calendarVisible={calnedarVisible}
      selectedDate={selectDateValue}
      changeCalendarVisible={changeCalendarVisible}
      datesWithDays={datesWithDays}
      leftArrowOnClick={() => changeYearAndMonth({ upOrDown: 'down' })}
      onDateClick={onDateClick}
      readOnly={true}
      rightArrowOnClick={() => changeYearAndMonth({ upOrDown: 'up' })}
      yearAndMonthValue={`${yearAndMonth.year}-${yearAndMonth.month}`}
      monthIncomeAndExpenditureVisible={false}
      dateSelectCalendar={true}
      dataListOptionList={dataListOptionList}
      onClickClearButton={onClickClearButton}
      onSubmitLedger={onSubmitLedger}
      category={dataListValue}
      description={descriptionValue}
      onChangeDataList={onChangeDataList}
      selectDateValue={selectDateValue}
      onClickSelectIncomeOrExpenditure={onClickSelectIncomeOrExpenditure}
      selectedButton={selectedButton}
      dataListValue={dataListValue}
      incomeOrExpenditure={selectedButton}
      onChangeAmountInput={onChangeAmountInput}
      onChangeDescriptionInput={onChangeDescriptionInput}
      amountValue={amountValue}
      descriptionValue={descriptionValue}
      closeModal={closeModal}
    />
  );
};

export const LedgerFormTest = Template.bind({});
LedgerFormTest.args = {
  dataListOptionList: categories,
};
