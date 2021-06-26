import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Form, IForm } from './Form';

export default {
  title: 'atoms/form',
  component: Form,
  argTypes: {},
} as Meta;

const Template: Story<IForm> = (args) => <Form {...args} />;

export const ledgerForm = Template.bind({});
ledgerForm.args = {
  type: 'ledger',
};
