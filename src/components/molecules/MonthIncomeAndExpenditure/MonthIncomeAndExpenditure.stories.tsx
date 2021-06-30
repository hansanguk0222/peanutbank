import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { IMonthIncomeAndExpenditure, MonthIncomeAndExpenditure } from './MonthIncomeAndExpenditure';
import { changeNumberForm } from '@/src/utils';

export default {
  title: 'molecules/MonthIncomeAndExpenditure',
  component: MonthIncomeAndExpenditure,
  argTypes: {},
} as Meta;

const Template: Story<IMonthIncomeAndExpenditure> = () => {
  return <MonthIncomeAndExpenditure expenditureLabel={changeNumberForm(500)} incomeLabel={changeNumberForm(5000)} />;
};
export const MonthIncomeAndExpenditureTest: Story<IMonthIncomeAndExpenditure> = Template.bind({});
MonthIncomeAndExpenditureTest.args = {};
