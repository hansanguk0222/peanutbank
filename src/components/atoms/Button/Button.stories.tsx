import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from './Button';

export default {
  title: 'atoms/button',
  component: Button,
  argTypes: {},
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const leftSideBarButton = Template.bind({});
leftSideBarButton.args = {
  buttonType: 'leftSideBarButton',
  label: '왼쪽 사이드바 버튼',
};
