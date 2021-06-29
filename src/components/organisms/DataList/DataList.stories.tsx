import React, { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { category } from '@/src/__test__/__feature__';
import { DataList, IDataList } from './DataList';
import { LedgerInputLabelText, LabelText, SelectIncomeOrExpenditureButtonText, DataListIds } from '@/src/utils/constants';

export default {
  title: 'molecules/DataList',
  component: DataList,
  argTypes: {},
} as Meta;

const Template: Story<IDataList> = (args) => {
  const { inputType, labelType, readOnly, label, list, labelValue, incomeOrExpenditure, id, optionList, text } = args;
  const [value, setValue] = useState<string>('');
  const onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <DataList
      id={id}
      inputType={inputType}
      optionList={optionList}
      onChange={onChangeInput}
      readOnly={readOnly}
      labelType={labelType}
      labelValue={labelValue}
      label={label}
      incomeOrExpenditure={incomeOrExpenditure}
      text={value}
      list={list}
    />
  );
};

export const CategoryTest = Template.bind({});
CategoryTest.args = {
  id: 'categoryList',
  optionList: category,
  inputType: 'ledgerInput',
  readOnly: false,
  labelType: 'ledgerLabel',
  label: LedgerInputLabelText.CATEGORY,
  labelValue: LabelText.CATEGORY,
  incomeOrExpenditure: SelectIncomeOrExpenditureButtonText.EXPENDITURE,
  list: DataListIds.CATEGORY,
};
