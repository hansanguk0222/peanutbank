import React, { useState, MouseEvent } from 'react';
import { Story, Meta } from '@storybook/react';
import { ISelectList, SelectList } from './SelectList';

export default {
  title: 'molecules/SelectList',
  component: SelectList,
  argTypes: {},
} as Meta;

const Template: Story<ISelectList> = (args) => {
  const { id, optionList } = args;
  const [value, setValue] = useState<string>('2021-06');
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return <SelectList id={id} onChange={onChange} optionList={optionList} value={value} />;
};

export const SelectYearAndMonthTest: Story<ISelectList> = Template.bind({});
SelectYearAndMonthTest.args = {
  id: 'selectYearAndMonth',
  optionList: ['2021-06', '2021-05', '2021-04', '2021-03'],
};
