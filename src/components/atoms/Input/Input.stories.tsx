import React, { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Input, InputProps } from './Input';

export default {
  title: 'atoms/input',
  component: Input,
  argTypes: {},
} as Meta;

const Template: Story<InputProps> = (args) => {
  const [localValue, setValue] = useState<string>();
  const onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <>
      {args.inputType === 'accountBookInput' && <Input inputType={args.inputType} label={args.label} onChange={onChangeInput} text={localValue} readOnly={args.readOnly} />}
      {args.inputType === 'dateInput' && <Input inputType={args.inputType} label={''} onChange={undefined} text={args.label} readOnly={args.readOnly} />}
    </>
  );
};

export const AccountInput: Story<InputProps> = Template.bind({});
AccountInput.args = {
  inputType: 'accountBookInput',
  label: '액수를 입력하세요',
  readOnly: false,
};

export const DateInput: Story<InputProps> = Template.bind({});
DateInput.args = {
  inputType: 'dateInput',
  label: '2020-01',
  readOnly: true,
};
