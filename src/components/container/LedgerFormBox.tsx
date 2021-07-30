import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { LedgerForm } from '@/src/components/organisms/LedgerForm';
import { SelectIncomeOrExpenditureButtonText, DataListIds } from '@/src/utils/constants';
import { changeNumberForm, makeDatesWithDays, splitByCommaAndJoinAmount } from '@/src/utils';
import { useCategoryState } from '@/src/hooks';
import { createLedgerRequest } from '@/src/store/slices/accountBook.slice';
import { useDispatch } from 'react-redux';
import { Cookies } from 'react-cookie';

const LedgerFormBox: React.FC<{ yyyymmdd: { yyyy: string; mm: string; dd: string }; calendarVisible: boolean; setCalendarVisible: (calendarVisible: boolean) => void }> = ({
  yyyymmdd,
  calendarVisible,
  setCalendarVisible,
}) => {
  const dispatch = useDispatch();

  const { categories } = useCategoryState();
  const [amountValue, setAmountValue] = useState<string>('');
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const [selectDateValue, setSelectDateValue] = useState<string>(`${yyyymmdd.yyyy}-${yyyymmdd.mm}-${yyyymmdd.dd}`);
  const [selectedButton, setSelectedButton] = useState<string>(SelectIncomeOrExpenditureButtonText.INCOME);
  const [dataListValue, setDataListValue] = useState<string>('');
  const [yearAndMonth, setYearAndMonth] = useState<{ year: number; month: number }>({ year: Number(yyyymmdd.yyyy), month: Number(yyyymmdd.mm) });
  const [datesWithDays, setDatesWithDays] = useState<{ yearAndMonth: string; date: number; day: number; thisMonth: boolean }[][]>([]);
  const cookies = new Cookies();

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

  const onDateClick = (date: string) => {
    const sliceByBar = date.split('-');
    const yyyy = sliceByBar[0];
    const mm = sliceByBar[1].length === 1 ? '0' + sliceByBar[1] : sliceByBar[1];
    const dd = sliceByBar[2].length === 1 ? '0' + sliceByBar[2] : sliceByBar[2];
    setSelectDateValue(`${yyyy}-${mm}-${dd}`);
    setCalendarVisible(!calendarVisible);
  };

  const changeCalendarVisible = () => {
    setCalendarVisible(!calendarVisible);
  };

  const onSubmitLedger: any = ({
    e,
    id,
    amount,
    selectedDate,
    incomeOrExpenditure,
    category,
    description,
  }: {
    e: FormEvent;
    id: string;
    nickname: string;
    amount: number;
    selectedDate: string;
    incomeOrExpenditure: string;
    category: string;
    description: string;
  }) => {
    e.preventDefault();
    if (!id) {
      dispatch(
        createLedgerRequest({
          amount,
          category,
          date: selectedDate,
          description,
          incomeOrExpenditure: '수입' === incomeOrExpenditure ? 'income' : 'expenditure',
          nickname: process.env.NODE_ENV === 'test' ? 'abc' : cookies.get('nickname'),
        })
      );
    }
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
    setDescriptionValue(e.target.value);
  };

  const onClickClearButton = () => {
    setAmountValue('');
    setDataListValue('');
    setDescriptionValue('');
    setSelectedButton(SelectIncomeOrExpenditureButtonText.INCOME);
  };

  const closeModal = () => {
    setCalendarVisible(false);
  };

  return (
    <LedgerForm
      nickname={process.env.NODE_ENV === 'test' ? 'abc' : cookies.get('nickname')}
      calendarVisible={calendarVisible}
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
      dataListOptionList={categories}
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

export default LedgerFormBox;
