import React, { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { LabelInput, ILabelInput } from './LabelInput';
import { LedgerInputLabelText, LabelText, SelectIncomeOrExpenditureButtonText } from '@/src/utils/constants';

export default {
  title: 'molecules/LabelInput',
  component: LabelInput,
  argTypes: {},
} as Meta;

const Template: Story<ILabelInput> = (args) => {
  const { inputType, labelType, readOnly, label, list, labelValue, incomeOrExpenditure } = args;
  const [value, setValue] = useState<string>('');
  const onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <LabelInput
      inputType={inputType}
      labelValue={labelValue}
      labelType={labelType}
      readOnly={readOnly}
      label={label}
      list={list}
      onChange={onChangeInput}
      text={value}
      incomeOrExpenditure={incomeOrExpenditure}
    />
  );
};

export const LedgerTextInputTest = Template.bind({});
LedgerTextInputTest.args = {
  inputType: 'ledgerInput',
  readOnly: false,
  labelType: 'ledgerLabel',
  label: LedgerInputLabelText.AMOUNT,
  labelValue: LabelText.AMOUNT,
  incomeOrExpenditure: SelectIncomeOrExpenditureButtonText.EXPENDITURE,
};
