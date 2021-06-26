import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Label, ILabel } from './Label';

export default {
  title: 'atoms/label',
  component: Label,
  argTypes: {},
} as Meta;

const Template: Story<ILabel> = (args) => <Label {...args} />;

export const LedgerLabelTest = Template.bind({});
LedgerLabelTest.args = {
  type: 'ledgerLabel',
  children: '분류',
};
