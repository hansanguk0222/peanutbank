import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { ChangeMonthBar, IChangeMonthBar } from './ChangeMonthBar';
import { changeNumberForm } from '@/src/utils';

export default {
  title: 'organisms/ChangeMonthBar',
  component: ChangeMonthBar,
  argTypes: {},
} as Meta;

const Template: Story<IChangeMonthBar> = () => {
  const [yearAndMonth, setYearAndMonth] = useState<{ year: number; month: number }>({ year: 2020, month: 1 });
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
  return (
    <ChangeMonthBar
      buttonType="changeMonthButton"
      inputType="dateInput"
      leftArrowOnClick={() => changeYearAndMonth({ upOrDown: 'down' })}
      rightArrowOnClick={() => changeYearAndMonth({ upOrDown: 'up' })}
      text={`${yearAndMonth.year}-${yearAndMonth.month}`}
      readOnly
      beforeCalendar={''}
      nextCalendar={''}
      expenditureLabel={changeNumberForm(50000)}
      incomeLabel={changeNumberForm(1000000)}
      monthIncomeAndExpenditureVisible={true}
    />
  );
};

export const ChangeMonthBarTest = Template.bind({});
