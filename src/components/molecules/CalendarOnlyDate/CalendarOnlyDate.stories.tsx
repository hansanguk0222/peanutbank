import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ICalendarOnlyDate, CalendarOnlyDate } from './CalendarOnlyDate';
import { makeDatesWithDays } from '@/src/utils/index';
import { accountBook } from '@/src/__test__/__feature__';

export default {
  title: 'molecules/CalendarOnlyDate',
  component: CalendarOnlyDate,
  argTypes: {},
} as Meta;

const Template: Story<ICalendarOnlyDate> = (args) => <CalendarOnlyDate {...args} />;

export const CalendarOnlyDateTest = Template.bind({});
CalendarOnlyDateTest.args = {
  yearAndMonth: '2021-6',
  datesWithDays: makeDatesWithDays({ year: 2021, month: 6 }),
  onClick: () => {},
  accountBook,
};
