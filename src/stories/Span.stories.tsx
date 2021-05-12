import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Span, SpanProps } from './Span';

export default {
  title: 'Example/Span',
  component: Span,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<SpanProps> = (args) => <Span {...args} />;

export const small = Template.bind({});
small.args = {
  size: 'small',
  label: 'small',
};

export const medium = Template.bind({});
medium.args = {
  size: 'medium',
  label: 'medium',
};

export const large = Template.bind({});
large.args = {
  size: 'large',
  label: 'large',
};
