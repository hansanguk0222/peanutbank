import React from 'react';
import { Story, Meta } from '@storybook/react';
import { A, AProps } from './A';

export default {
  title: 'atoms/a',
  component: A,
  argTypes: {},
} as Meta;

const Template: Story<AProps> = (args) => <A {...args} />;

export const leftSideBarLink = Template.bind({});
leftSideBarLink.args = {
  aType: 'leftSideBarLink',
  label: '왼쪽 사이드바 버튼',
};
