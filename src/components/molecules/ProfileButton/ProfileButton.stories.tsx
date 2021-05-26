import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { ProfileButton, ProfileButtonProps } from './ProfileButton';

export default {
  title: 'molecules/profileButton',
  component: ProfileButton,
  argTypes: {},
} as Meta;

const Template: Story<ProfileButtonProps> = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const onClick: () => void = () => {
    console.log(modalVisible);
    setModalVisible(!modalVisible);
  };
  return <ProfileButton buttonType="profileButton" onClick={onClick} src="https://www.askbayou.com/wp-content/uploads/2021/02/square.jpg" />;
};

export const ProfileButtonTest = Template.bind({});
ProfileButtonTest.args = {};
