import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { HeaderBar } from './HeaderBar';
import { IButtonWithIcon } from '@/src/components/molecules/IconWithButton';
export default {
  title: 'organisms/HeaderBar',
  component: HeaderBar,
  argTypes: {},
} as Meta;

const Template: Story<IButtonWithIcon> = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const onClick: () => void = () => {
    console.log(modalVisible);
    setModalVisible(!modalVisible);
  };
  return <HeaderBar buttonType="profileButton" onClick={onClick} src="https://www.askbayou.com/wp-content/uploads/2021/02/square.jpg" />;
};

export const HeaderBarTest = Template.bind({});
HeaderBarTest.args = {};
