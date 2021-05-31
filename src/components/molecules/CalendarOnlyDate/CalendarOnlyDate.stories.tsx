import React from 'react';
import { Story, Meta } from '@storybook/react';
import { CalendarOnlyDateProps, CalendarOnlyDate } from './CalendarOnlyDate';
import { makeDatesWithDays } from '@/src/utils/index';

export default {
  title: 'molecules/CalendarOnlyDate',
  component: CalendarOnlyDate,
  argTypes: {},
} as Meta;

const Template: Story<CalendarOnlyDateProps> = (args) => <CalendarOnlyDate {...args} />;

export const CalendarOnlyDateTest = Template.bind({});
CalendarOnlyDateTest.args = {
  datesWithDays: makeDatesWithDays({ year: 2021, month: 1 }),
  onClick: () => {},
};
