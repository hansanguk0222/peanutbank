import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { LeftSideBar, ILeftSideBar, LinkURLAndButtonType } from './LeftSideBar';

export default {
  title: 'molecules/LeftSideBar',
  component: LeftSideBar,
  argTypes: {},
} as Meta;

const Template: Story<ILeftSideBar> = () => {
  const [menu, setMenu] = useState<string>('incomeAndExpenditure');
  const onClick: (url: string) => void = (url: string) => {
    setMenu(url);
  };
  const linkURLAndButtonTypes: LinkURLAndButtonType[] = [
    { aType: 'leftSideBarLink', url: 'incomeAndExpenditure', label: '수입/지출', isSelected: menu === 'incomeAndExpenditure' },
    { aType: 'leftSideBarLink', url: 'calendar', label: '달력', isSelected: menu === 'calendar' },
    { aType: 'leftSideBarLink', url: 'detail', label: '상세분석', isSelected: menu === 'detail' },
    { aType: 'leftSideBarLink', url: 'mypage', label: '마이페이지', isSelected: menu === 'mypage' },
  ];
  return <LeftSideBar linkURLAndButtonTypes={linkURLAndButtonTypes} onClick={onClick} />;
};

export const LeftSideBarTest: Story<ILeftSideBar> = Template.bind({});
LeftSideBarTest.args = {};
