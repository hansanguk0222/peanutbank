import React, { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Input, IInput } from './Input';

export default {
  title: 'atoms/input',
  component: Input,
  argTypes: {},
} as Meta;

const Template: Story<IInput> = (args) => {
  const [localValue, setValue] = useState<string>();
  const onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <>
      {args.inputType === 'ledgerInput' && <Input inputType={args.inputType} label={args.label} onChange={onChangeInput} text={localValue} readOnly={args.readOnly} />}
      {args.inputType === 'dateInput' && <Input inputType={args.inputType} label={''} onChange={undefined} text={args.label} readOnly={args.readOnly} />}
    </>
  );
};

export const AccountInput: Story<IInput> = Template.bind({});
AccountInput.args = {
  inputType: 'ledgerInput',
  label: '액수를 입력하세요',
  readOnly: false,
};

export const DateInput: Story<IInput> = Template.bind({});
DateInput.args = {
  inputType: 'dateInput',
  label: '2020-01',
  readOnly: true,
};
