import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { LedgerForm } from '@/src/components/organisms/LedgerForm';
import { SelectIncomeOrExpenditureButtonText, DataListIds } from '@/src/utils/constants';
import { changeNumberForm, makeDatesWithDays, splitByCommaAndJoinAmount } from '@/src/utils';
import { useCategoryState } from '@/src/hooks';
import { createLedgerRequest } from '@/src/store/slices/accountBook.slice';
import { useDispatch } from 'react-redux';

const LedgerFormBox: React.FC<{ yyyy: string; mm: string; dd: string; calendarVisible: boolean; setCalendarVisible: (calendarVisible: boolean) => void }> = ({
  yyyy,
  mm,
  dd,
  calendarVisible,
  setCalendarVisible,
}) => {
  const dispatch = useDispatch();

  const { categorys } = useCategoryState();
  const [amountValue, setAmountValue] = useState<string>('');
  const [discriptionValue, setDiscriptionValue] = useState<string>('');
  const [selectDateValue, setSelectDateValue] = useState<string>(`${yyyy}-${mm}-${dd}`);
  const [selectedButton, setSelectedButton] = useState<string>(SelectIncomeOrExpenditureButtonText.INCOME);
  const [dataListValue, setDataListValue] = useState<string>('');
  const [yearAndMonth, setYearAndMonth] = useState<{ year: number; month: number }>({ year: Number(yyyy), month: Number(mm) });
  const [datesWithDays, setDatesWithDays] = useState<{ yearAndMonth: string; date: number; day: number; thisMonth: boolean }[][]>([]);

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
    userId,
    amount,
    selectedDate,
    incomeOrExpenditure,
    category,
    discription,
  }: {
    e: FormEvent;
    id: string;
    userId: string;
    amount: number;
    selectedDate: string;
    incomeOrExpenditure: string;
    category: string;
    discription: string;
  }) => {
    e.preventDefault();
    if (!id) {
      dispatch(createLedgerRequest({ amount, category, date: selectedDate, discription, incomeOrExpenditure, userId: process.env.NODE_ENV === 'test' ? 'abc' : '' }));
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

  const onChangeDiscriptionInput = (e) => {
    setDiscriptionValue(e.target.value);
  };

  const onClickClearButton = () => {
    setAmountValue('');
    setDataListValue('');
    setDiscriptionValue('');
    setSelectedButton(SelectIncomeOrExpenditureButtonText.INCOME);
  };

  const closeModal = () => {
    setCalendarVisible(false);
  };

  return (
    <LedgerForm
      userId={process.env.NODE_ENV === 'test' ? 'abc' : ''} //임시로 넣어서 나중에 무조건 고쳐야 됨, 로그인 회원 가입 얼른 구현합시다~
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
      dataListOptionList={categorys}
      onClickClearButton={onClickClearButton}
      onSubmitLedger={onSubmitLedger}
      category={dataListValue}
      discription={discriptionValue}
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

export default LedgerFormBox;
