import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { CommonLayout, ICommonLayout } from './CommonLayout';
import { LinkURLAndButtonType } from '@/src/components/molecules/LeftSideBar';

export default {
  title: 'organisms/CommonLayout',
  component: CommonLayout,
  argTypes: {},
} as Meta;

const Template: Story<ICommonLayout> = () => {
  const [menu, setMenu] = useState<string>('incomeAndExpenditure');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const leftSideBarOnClick: (url: string) => void = (url: string) => {
    setMenu(url);
  };
  const headerBarOnClick: () => void = () => {
    setModalVisible(!modalVisible);
  };
  const linkURLAndButtonTypes: LinkURLAndButtonType[] = [
    { aType: 'leftSideBarLink', url: 'incomeAndExpenditure', label: '수입/지출', isSelected: menu === 'incomeAndExpenditure' },
    { aType: 'leftSideBarLink', url: 'calendar', label: '달력', isSelected: menu === 'calendar' },
    { aType: 'leftSideBarLink', url: 'detail', label: '상세분석', isSelected: menu === 'detail' },
    { aType: 'leftSideBarLink', url: 'mypage', label: '마이페이지', isSelected: menu === 'mypage' },
  ];
  return (
    <CommonLayout
      buttonType="profileButton"
      headerBarOnClick={headerBarOnClick}
      leftSideBarOnClick={leftSideBarOnClick}
      linkURLAndButtonTypes={linkURLAndButtonTypes}
      src="https://www.askbayou.com/wp-content/uploads/2021/02/square.jpg"
    >
      <div style={{ height: '500px' }}>hi</div>
    </CommonLayout>
  );
};

export const LeftSideBarTest: Story<ICommonLayout> = Template.bind({});
LeftSideBarTest.args = {};
