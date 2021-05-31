import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Span, SpanProps } from './Span';

export default {
  title: 'atoms/span',
  component: Span,
  argTypes: {},
} as Meta;

const Template: Story<SpanProps> = (args) => <Span {...args} />;

export const Week = Template.bind({});
Week.args = {
  spanType: 'calendarDate',
  day: 1,
  children: 'Mon',
};

export const Sat = Template.bind({});
Sat.args = {
  spanType: 'calendarDate',
  day: 6,
  children: 'Sat',
};

export const Sun = Template.bind({});
Sun.args = {
  spanType: 'calendarDate',
  day: 0,
  children: 'Sun',
};