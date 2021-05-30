import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from './Button';
import BackMonthButton from '@/public/left-arrow.svg';

export default {
  title: 'atoms/button',
  component: Button,
  argTypes: {},
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const profileButton = Template.bind({});
profileButton.args = {
  buttonType: 'profileButton',
  children: '프로필 버튼',
};

export const changeBackMonthButton = Template.bind({});
changeBackMonthButton.args = {
  buttonType: 'changeMonthButton',
  children: (
    <div>
      <BackMonthButton />
    </div>
  ),
};
