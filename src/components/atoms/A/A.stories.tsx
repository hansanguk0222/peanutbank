import React from 'react';
import { Story, Meta } from '@storybook/react';
import { A, IA } from './A';

export default {
  title: 'atoms/a',
  component: A,
  argTypes: {},
} as Meta;

const Template: Story<IA> = (args) => <A {...args} />;

export const leftSideBarLink = Template.bind({});
leftSideBarLink.args = {
  aType: 'leftSideBarLink',
  label: '왼쪽 사이드바 버튼',
};

export const headerBarLink = Template.bind({});
headerBarLink.args = {
  aType: 'headerBarLink',
  label: 'PeanutBank',
};
