import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Img, IImg } from './Img';

export default {
  title: 'atoms/img',
  component: Img,
  argTypes: {},
} as Meta;

const Template: Story<IImg> = (args) => <Img {...args} />;

export const ImgTest = Template.bind({});
ImgTest.args = {
  alt: 'test',
  src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
};
