import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, IButton } from './Button';
import { LeftArrow } from '@/public';

export default {
  title: 'atoms/button',
  component: Button,
  argTypes: {},
} as Meta;

const Template: Story<IButton> = (args) => <Button {...args} />;

export const profileButton = Template.bind({});
profileButton.args = {
  buttonType: 'profileButton',
  children: '프로필 버튼',
};

export const changeBackMonthButton = Template.bind({});
changeBackMonthButton.args = {
  buttonType: 'changeMonthButton',
  children: <LeftArrow />,
};
