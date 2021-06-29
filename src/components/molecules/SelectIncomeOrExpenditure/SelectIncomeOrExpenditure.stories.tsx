import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { ISelectIncomeOrExpenditure, SelectIncomeOrExpenditure } from './SelectIncomeOrExpenditure';
import { SelectIncomeOrExpenditureButtonText } from '@/src/utils/constants';

export default {
  title: 'molecules/SelectIncomeOrExpenditure',
  component: SelectIncomeOrExpenditure,
  argTypes: {},
} as Meta;

const Template: Story<ISelectIncomeOrExpenditure> = () => {
  const [selectedButton, setSelectedButton] = useState<string>(SelectIncomeOrExpenditureButtonText.INCOME);
  const selectButton: (whichButton: '수입' | '지출') => void = (whichButton: '수입' | '지출') => {
    console.log(whichButton);
    setSelectedButton(whichButton);
  };
  return <SelectIncomeOrExpenditure buttonType="selectIncomeOrExpenditureButton" onClick={selectButton} selectedButton={selectedButton} />;
};

export const SelectIncomeOrExpenditureTest: Story<ISelectIncomeOrExpenditure> = Template.bind({});
